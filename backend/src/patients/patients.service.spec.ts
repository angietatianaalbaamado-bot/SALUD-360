import { ConflictException, NotFoundException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: jest.Mocked<
    Pick<Repository<Patient>, 'create' | 'save' | 'find' | 'findOne' | 'merge'>
  >;

  const patient = {
    id: 1,
    document_type_id: 1,
    document_number: '1020304050',
    first_name: 'Ana',
    last_name: 'Gomez',
    birth_date: '1995-08-20',
    gender_id: 2,
    is_active: true,
  } as Patient;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
    };

    service = new PatientsService(repository as unknown as Repository<Patient>);
  });

  it('crea un paciente válido', async () => {
    repository.create.mockReturnValue(patient);
    repository.save.mockResolvedValue(patient);

    const result = await service.create({
      document_type_id: 1,
      document_number: '1020304050',
      first_name: 'Ana',
      last_name: 'Gomez',
      birth_date: '1995-08-20',
      gender_id: 2,
    });

    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(patient);
    expect(result).toEqual(patient);
  });

  it('lista pacientes ordenados con sus catálogos', async () => {
    repository.find.mockResolvedValue([patient]);

    const result = await service.findAll();

    expect(result).toEqual([patient]);
    expect(repository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        order: { last_name: 'ASC', first_name: 'ASC' },
      }),
    );
  });

  it('informa cuando el paciente no existe', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('desactiva sin borrar físicamente al paciente', async () => {
    repository.findOne.mockResolvedValue({ ...patient });
    repository.save.mockImplementation(async (value) => value as Patient);

    const result = await service.deactivate(1);

    expect(result.is_active).toBe(false);
    expect(repository.save).toHaveBeenCalled();
  });

  it('traduce un documento duplicado a un conflicto comprensible', async () => {
    repository.create.mockReturnValue(patient);
    repository.save.mockRejectedValue(
      new QueryFailedError(
        'INSERT',
        [],
        Object.assign(new Error('Documento duplicado'), { code: '23505' }),
      ),
    );

    await expect(
      service.create({
        document_type_id: 1,
        document_number: '1020304050',
        first_name: 'Ana',
        last_name: 'Gomez',
        birth_date: '1995-08-20',
        gender_id: 2,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
