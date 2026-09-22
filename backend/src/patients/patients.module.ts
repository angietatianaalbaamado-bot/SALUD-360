import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { DoctorAvailability } from './entities/doctor-availability.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { DoctorSpecialty } from './entities/doctor-specialty.entity';
import { Doctor } from './entities/doctor.entity';
import { PatientAddress } from './entities/patient-address.entity';
import { PatientContact } from './entities/patient-contact.entity';
import { PatientDocument } from './entities/patient-document.entity';
import { PatientInsurance } from './entities/patient-insurance.entity';
import { PatientPhoto } from './entities/patient-photo.entity';
import { Patient } from './entities/patient.entity';
import { Specialty } from './entities/specialty.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Patient,
      PatientContact,
      PatientAddress,
      PatientDocument,
      PatientPhoto,
      PatientInsurance,
      Doctor,
      Specialty,
      DoctorSpecialty,
      DoctorSchedule,
      DoctorAvailability,
    ]),
  ],
  controllers: [PatientsController, DoctorsController],
  providers: [PatientsService, DoctorsService],
  exports: [PatientsService, DoctorsService],
})
export class PatientsModule {}
