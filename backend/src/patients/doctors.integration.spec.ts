import { randomUUID } from 'node:crypto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Client } from 'pg';
import { DataSource, Repository } from 'typeorm';
import { BillingModule } from '../billing/billing.module';
import { DocumentType } from '../billing/entities/document-type.entity';
import { PatientsModule } from './patients.module';
import { Doctor } from './entities/doctor.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';

// Opt-in: usar una base de pruebas. Solo se elimina el esquema creado por esta suite.
const databaseUrl = process.env.DOCTORS_TEST_DATABASE_URL;
const describeWithPostgres = databaseUrl ? describe : describe.skip;

describeWithPostgres('API de medicos con PostgreSQL', () => {
  const schema = `doctors_test_${randomUUID().replace(/-/g, '')}`;
  const secret = 'doctors-integration-test-only';
  let app: INestApplication;
  let client: Client;
  let source: DataSource;
  let doctors: Repository<Doctor>;
  let documentTypeId: number;
  let userId: number;
  let token: string;
  let baseUrl: string;

  beforeAll(async () => {
    client = new Client({ connectionString: databaseUrl });
    await client.connect();
    await client.query(`CREATE SCHEMA "${schema}"`);
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        TypeOrmModule.forRoot({
          type: 'postgres', url: databaseUrl, schema, synchronize: true,
          retryAttempts: 0, autoLoadEntities: true,
        }),
        PatientsModule,
        BillingModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useValue(new ConfigService({ JWT_SECRET: secret }))
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
    source = app.get(DataSource);
    doctors = source.getRepository(Doctor);
    const documentType = await source.getRepository(DocumentType).save({ name: 'Documento de prueba' });
    documentTypeId = documentType.id;
    const credentials = { email: 'doctor-test@example.com', password: 'Doctor-test-2026' };
    const registered = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: 'Usuario de prueba', ...credentials }),
    });
    expect(registered.status).toBe(201);
    userId = (await registered.json()).id;
    const loggedIn = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    expect(loggedIn.ok).toBe(true);
    token = (await loggedIn.json()).access_token;
    expect(typeof token).toBe('string');
  }, 30000);

  afterAll(async () => {
    try {
      if (app) await app.close();
    } finally {
      if (client) {
        try { await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`); }
        finally { await client.end(); }
      }
    }
  });

  beforeEach(async () => {
    await doctors.createQueryBuilder().delete().execute();
  });

  const data = (suffix = '1') => ({
    document_type_id: documentTypeId, document_number: `DOC-${suffix}`,
    medical_license: `RM-${suffix}`, first_name: 'Ana', last_name: 'Gomez',
  });

  async function request(method: string, path = '', body?: unknown, authorization = token) {
    const response = await fetch(`${baseUrl}/doctors${path}`, {
      method,
      headers: { 'Content-Type': 'application/json',
        ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
  }

  it.each([['GET', ''], ['GET', '/1'], ['POST', ''], ['PATCH', '/1'], ['DELETE', '/1']])(
    '%s %s exige autenticacion', async (method, path) => {
      expect((await request(method, path, undefined, '')).status).toBe(401);
    },
  );

  it('rechaza un token invalido', async () => {
    expect((await request('GET', '', undefined, 'invalid-token')).status).toBe(401);
  });

  it('registra, consulta, actualiza y desactiva conservando los datos y horarios', async () => {
    const created = await request('POST', '', { ...data(), user_id: userId });
    expect(created.status).toBe(201);
    expect(created.body).toMatchObject({ ...data(), user_id: userId, is_active: true });
    const id = created.body.id;
    await source.getRepository(DoctorSchedule).save({
      doctor_id: id, day_of_week: 1, start_time: '08:00', end_time: '12:00',
    });
    const detail = await request('GET', `/${id}`);
    expect(detail.status).toBe(200);
    expect(detail.body.user).toBeUndefined();
    expect(JSON.stringify(detail.body)).not.toContain('password_hash');
    expect((await request('GET')).body).toEqual([detail.body]);
    const updated = await request('PATCH', `/${id}`, { phone: '3001234567', email: 'ana@example.com' });
    expect(updated.status).toBe(200);
    expect(updated.body).toMatchObject({ ...data(), phone: '3001234567', user_id: userId });
    const cleared = await request('PATCH', `/${id}`, { email: null, user_id: null });
    expect(cleared.status).toBe(200);
    expect(cleared.body).toMatchObject({ email: null, user_id: null });
    const deactivated = await request('DELETE', `/${id}`);
    expect(deactivated.status).toBe(200);
    expect(deactivated.body).toMatchObject({ id, is_active: false, medical_license: data().medical_license });
    expect(await doctors.countBy({ id })).toBe(1);
    expect(await source.getRepository(DoctorSchedule).countBy({ doctor_id: id })).toBe(1);
    expect((await request('DELETE', `/${id}`)).status).toBe(200);
    expect((await request('GET')).body).toHaveLength(1);
    const reactivated = await request('PATCH', `/${id}`, { is_active: true });
    expect(reactivated.status).toBe(200);
    expect(reactivated.body.is_active).toBe(true);
  });

  it('lista por apellido y nombre, incluyendo medicos inactivos', async () => {
    const last = await doctors.save({ ...data('3'), last_name: 'Zulu' });
    const second = await doctors.save({ ...data('2'), first_name: 'Zoe', last_name: 'Alba' });
    const first = await doctors.save({ ...data('1'), last_name: 'Alba', is_active: false });
    const result = await request('GET');
    expect(result.status).toBe(200);
    expect(result.body.map((doctor: Doctor) => doctor.id)).toEqual([first.id, second.id, last.id]);
  });

  it.each(['document_number', 'medical_license', 'user_id'])(
    'evita duplicar %s al crear y al actualizar', async (field) => {
      const first = await doctors.save({ ...data('1'), user_id: userId });
      const duplicate = { ...data('2'), [field]: first[field] };
      const created = await request('POST', '', duplicate);
      expect(created.status).toBe(409);
      const second = await doctors.save(data('2'));
      expect((await request('PATCH', `/${second.id}`, { [field]: first[field] })).status).toBe(409);
      expect(await doctors.count()).toBe(2);
    },
  );

  it.each(['user_id', 'document_type_id'])(
    'rechaza %s inexistente en registro y edicion', async (field) => {
      expect((await request('POST', '', { ...data(), [field]: 999999 })).status).toBe(400);
      const doctor = await doctors.save(data());
      expect((await request('PATCH', `/${doctor.id}`, { [field]: 999999 })).status).toBe(400);
    },
  );

  it.each(['GET', 'PATCH', 'DELETE'])(
    '%s devuelve 404 para un medico inexistente', async (method) => {
      expect((await request(method, '/999999', method === 'PATCH' ? { phone: '123' } : undefined)).status).toBe(404);
    },
  );

  it('rechaza campos desconocidos, nulos obligatorios e identificadores invalidos', async () => {
    expect((await request('POST', '', { ...data(), user: { id: userId } })).status).toBe(400);
    const doctor = await doctors.save(data());
    expect((await request('PATCH', `/${doctor.id}`, { medical_license: null })).status).toBe(400);
    expect((await request('GET', '/abc')).status).toBe(400);
    expect((await doctors.findOneByOrFail({ id: doctor.id })).medical_license).toBe(data().medical_license);
  });

  it('mantiene la unicidad ante registros simultaneos', async () => {
    const results = await Promise.all([request('POST', '', data()), request('POST', '', data())]);
    expect(results.map(result => result.status).sort()).toEqual([201, 409]);
    expect(await doctors.count()).toBe(1);
  });

  it('documenta las cinco operaciones y sus respuestas en Swagger', () => {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder().addBearerAuth().build());
    expect(Object.keys(document.paths['/doctors'])).toEqual(expect.arrayContaining(['get', 'post']));
    expect(Object.keys(document.paths['/doctors/{id}'])).toEqual(expect.arrayContaining(['get', 'patch', 'delete']));
    expect(document.paths['/doctors'].post?.security).toEqual([{ bearer: [] }]);
    const schema = document.components?.schemas?.Doctor;
    expect(schema && 'properties' in schema && schema.properties?.medical_license).toBeDefined();
    expect(schema && 'properties' in schema && schema.properties?.user).toBeUndefined();
  });
});
