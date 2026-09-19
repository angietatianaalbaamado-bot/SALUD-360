import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalRecordsController } from './medical-records.controller';
import { MedicalRecordsService } from './medical-records.service';

import { MedicalRecord } from './entities/medical-record.entity';
import { Consultation } from './entities/consultation.entity';
import { Diagnosis } from './entities/diagnosis.entity';
import { Treatment } from './entities/treatment.entity';
import { Prescription } from './entities/prescription.entity';
import { MedicalNote } from './entities/medical-note.entity';
import { Disease } from './entities/disease.entity';
import { Allergy } from './entities/allergy.entity';
import { ChronicCondition } from './entities/chronic-condition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalRecord,
      Consultation,
      Diagnosis,
      Treatment,
      Prescription,
      MedicalNote,
      Disease,
      Allergy,
      ChronicCondition,
    ]),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}