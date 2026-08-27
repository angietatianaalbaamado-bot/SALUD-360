import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(dto);

    try {
      return await this.patientRepository.save(patient);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find({
      relations: {
        document_type: true,
        gender: true,
        blood_type: true,
        marital_status: true,
      },
      order: { last_name: 'ASC', first_name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        document_type: true,
        gender: true,
        blood_type: true,
        marital_status: true,
        contacts: true,
        addresses: true,
        documents: true,
        photos: true,
        insurances: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente ${id} no encontrado`);
    }

    return patient;
  }

  async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    this.patientRepository.merge(patient, dto);

    try {
      return await this.patientRepository.save(patient);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async deactivate(id: number): Promise<Patient> {
    const patient = await this.findOne(id);
    patient.is_active = false;
    return this.patientRepository.save(patient);
  }

  private handleDatabaseError(error: unknown): never {
    if (error instanceof QueryFailedError) {
      const code = (error.driverError as { code?: string }).code;

      if (code === '23505') {
        throw new ConflictException('Ya existe un paciente con ese documento');
      }

      if (code === '23503') {
        throw new BadRequestException(
          'Uno de los catálogos seleccionados no existe',
        );
      }

      if (code === '23514') {
        throw new BadRequestException('Los datos no cumplen las reglas del paciente');
      }
    }

    throw error;
  }
}
