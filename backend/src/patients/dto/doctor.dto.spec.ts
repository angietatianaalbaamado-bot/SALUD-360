import { ValidationPipe } from '@nestjs/common';
import { CreateDoctorDto } from './create-doctor.dto';
import { UpdateDoctorDto } from './update-doctor.dto';

describe('Validacion de medicos', () => {
  const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true });
  const valid = {
    document_type_id: 1, document_number: '12345', medical_license: 'RM-1',
    first_name: 'Ana', last_name: 'Gomez',
  };
  const create = (value: unknown) => pipe.transform(value, { type: 'body', metatype: CreateDoctorDto });
  const update = (value: unknown) => pipe.transform(value, { type: 'body', metatype: UpdateDoctorDto });

  it('normaliza espacios en datos de identificacion', async () => {
    await expect(create({ ...valid, medical_license: ' RM-1 ', first_name: ' Ana ' }))
      .resolves.toMatchObject({ medical_license: 'RM-1', first_name: 'Ana' });
  });

  it.each([
    { first_name: '   ' }, { last_name: '' }, { document_number: null },
    { medical_license: 'x'.repeat(81) }, { email: 'sin-arroba' },
    { document_type_id: -1 }, { document_type_id: '1' }, { user_id: 1.5 },
    { is_active: null }, { is_active: 'true' }, { id: 2 },
    { user: { id: 1 } },
  ])('rechaza datos invalidos: %j', async (invalid) => {
    await expect(create({ ...valid, ...invalid })).rejects.toMatchObject({ status: 400 });
  });

  it('exige los datos obligatorios al registrar', async () => {
    await expect(create({})).rejects.toMatchObject({ status: 400 });
  });

  it('acepta cambios parciales y permite borrar campos opcionales', async () => {
    await expect(update({ email: null, user_id: null }))
      .resolves.toMatchObject({ email: null, user_id: null });
  });

  it.each(['document_type_id', 'document_number', 'medical_license', 'first_name', 'last_name', 'is_active'])(
    'no permite borrar %s con null', async (field) => {
      await expect(update({ [field]: null })).rejects.toMatchObject({ status: 400 });
    },
  );
});
