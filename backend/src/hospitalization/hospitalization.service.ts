import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hospitalization } from './entities/hospitalization.entity';
import { CreateHospitalizationDto } from './dto/create-hospitalization.dto';
import { UpdateHospitalizationDto } from './dto/update-hospitalization.dto';

@Injectable()
export class HospitalizationService {
  constructor(
    @InjectRepository(Hospitalization)
    private readonly hospitalizationRepo: Repository<Hospitalization>,
  ) {}

  findAll(): Promise<Hospitalization[]> {
    return this.hospitalizationRepo.find();
  }

  async findOne(id: number): Promise<Hospitalization> {
    const hospitalization = await this.hospitalizationRepo.findOne({
      where: { id },
    });

    if (!hospitalization) {
      throw new NotFoundException(
        `Hospitalización con ID ${id} no encontrada`,
      );
    }

    return hospitalization;
  }

  async create(dto: CreateHospitalizationDto): Promise<Hospitalization> {
    const hospitalization = this.hospitalizationRepo.create({
      patientId: dto.patient_id,
      admissionDate: new Date(dto.admission_date),
      reason: dto.reason,
      dischargeDate: dto.discharge_date
        ? new Date(dto.discharge_date)
        : null,
      diagnosis: dto.diagnosis,
      status: dto.status ?? 'active',
      observations: dto.observations,
    });

    return this.hospitalizationRepo.save(hospitalization);
  }

  async update(
    id: number,
    dto: UpdateHospitalizationDto,
  ): Promise<Hospitalization> {
    const hospitalization = await this.findOne(id);

    Object.assign(hospitalization, {
      patientId: dto.patient_id ?? hospitalization.patientId,
      admissionDate: dto.admission_date
        ? new Date(dto.admission_date)
        : hospitalization.admissionDate,
      dischargeDate:
        dto.discharge_date !== undefined
          ? dto.discharge_date
            ? new Date(dto.discharge_date)
            : null
          : hospitalization.dischargeDate,
      reason: dto.reason ?? hospitalization.reason,
      diagnosis: dto.diagnosis ?? hospitalization.diagnosis,
      status: dto.status ?? hospitalization.status,
      observations: dto.observations ?? hospitalization.observations,
    });

    return this.hospitalizationRepo.save(hospitalization);
  }
    async remove(id: number): Promise<void> {
    const hospitalization = await this.findOne(id);

    await this.hospitalizationRepo.remove(hospitalization);
  }
}
