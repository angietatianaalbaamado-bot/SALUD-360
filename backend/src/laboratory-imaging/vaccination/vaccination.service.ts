import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccine } from '../entities/vaccine.entity';
import { VaccinationRecord } from '../entities/vaccination-record.entity';

@Injectable()
export class VaccinationService {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepo: Repository<Vaccine>,
    @InjectRepository(VaccinationRecord)
    private readonly recordRepo: Repository<VaccinationRecord>,
  ) {}

  findAllVaccines() {
    return this.vaccineRepo.find();
  }

  createVaccine(data: Partial<Vaccine>) {
    return this.vaccineRepo.save(this.vaccineRepo.create(data));
  }

  findAllRecords() {
    return this.recordRepo.find({ relations: ['vaccine'] });
  }

  findRecordsByPatient(patientId: number) {
    return this.recordRepo.find({
      where: { patientId },
      relations: ['vaccine'],
    });
  }

  createRecord(data: Partial<VaccinationRecord>) {
    return this.recordRepo.save(this.recordRepo.create(data));
  }
}
