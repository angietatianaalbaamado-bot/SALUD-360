import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  create(dto: CreateDoctorDto): Promise<Doctor> {
    return this.save(this.doctorRepository.create(dto));
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({
      order: { last_name: 'ASC', first_name: 'ASC', id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    // No cargar la relación user: contiene credenciales de Seguridad.
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Médico ${id} no encontrado`);
    }
    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    this.doctorRepository.merge(doctor, dto);
    return this.save(doctor);
  }

  async deactivate(id: number): Promise<Doctor> {
    const doctor = await this.findOne(id);
    doctor.is_active = false;
    return this.save(doctor);
  }

  private async save(doctor: Doctor): Promise<Doctor> {
    try {
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { code, constraint } = error.driverError as {
          code?: string;
          constraint?: string;
        };
        if (code === '23505') {
          const messages: Record<string, string> = {
            uq_doctors_document: 'Ya existe un médico con ese documento',
            uq_doctors_medical_license: 'El registro profesional ya está registrado',
            uq_doctors_user: 'El usuario ya está vinculado a otro médico',
          };
          throw new ConflictException(
            messages[constraint ?? ''] ?? 'El documento, registro profesional o usuario ya está registrado',
          );
        }
        if (code === '23503') {
          throw new BadRequestException(
            'El usuario o el tipo de documento seleccionado no existe',
          );
        }
      }
      throw error;
    }
  }
}
