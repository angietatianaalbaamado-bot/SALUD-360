import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let repository: jest.Mocked<Pick<Repository<Doctor>, 'create' | 'save' | 'find' | 'findOne' | 'merge'>>;

  beforeEach(() => {
    repository = {
      create: jest.fn(), save: jest.fn(), find: jest.fn(),
      findOne: jest.fn(), merge: jest.fn(),
    };
    service = new DoctorsService(repository as unknown as Repository<Doctor>);
  });

  it.each(['findOne', 'update', 'deactivate'] as const)(
    '%s informa cuando el medico no existe',
    async (operation) => {
      repository.findOne.mockResolvedValue(null);
      const result = operation === 'update'
        ? service.update(999, {})
        : service[operation](999);
      await expect(result).rejects.toBeInstanceOf(NotFoundException);
      expect(repository.save).not.toHaveBeenCalled();
    },
  );

  it('desactiva sin borrar el registro ni sus referencias', async () => {
    const doctor = { id: 2, user_id: 3, medical_license: 'RM-1', is_active: true } as Doctor;
    repository.findOne.mockResolvedValue(doctor);
    repository.save.mockImplementation(async (value) => value as Doctor);
    await expect(service.deactivate(2)).resolves.toMatchObject({
      id: 2, user_id: 3, medical_license: 'RM-1', is_active: false,
    });
  });

  it.each([
    ['uq_doctors_document', 'Ya existe un médico con ese documento'],
    ['uq_doctors_medical_license', 'El registro profesional ya está registrado'],
    ['uq_doctors_user', 'El usuario ya está vinculado a otro médico'],
  ])('traduce el conflicto %s al actualizar', async (constraint, message) => {
    repository.findOne.mockResolvedValue({ id: 1 } as Doctor);
    repository.save.mockRejectedValue(new QueryFailedError('UPDATE', [],
      Object.assign(new Error('duplicate'), { code: '23505', constraint })));
    const result = service.update(1, { medical_license: 'RM-2' });
    await expect(result).rejects.toBeInstanceOf(ConflictException);
    await expect(result).rejects.toThrow(message);
  });

  it('rechaza referencias inexistentes', async () => {
    repository.findOne.mockResolvedValue({ id: 1 } as Doctor);
    repository.save.mockRejectedValue(new QueryFailedError('UPDATE', [],
      Object.assign(new Error('foreign key'), { code: '23503' })));
    await expect(service.update(1, { user_id: 999 })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('conserva errores inesperados de la base de datos', async () => {
    const error = new Error('Connection lost');
    repository.findOne.mockResolvedValue({ id: 1 } as Doctor);
    repository.save.mockRejectedValue(error);
    await expect(service.update(1, { phone: '3001234567' })).rejects.toBe(error);
  });
});
