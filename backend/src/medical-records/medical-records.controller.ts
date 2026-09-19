import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';

@ApiTags('Historia Clínica')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Get('diseases')
  findAllDiseases() {
    return this.medicalRecordsService.findAllDiseases();
  }

  @Post()
  createMedicalRecord(@Body() dto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.createMedicalRecord(dto);
  }

  @Get(':id')
  findOneMedicalRecord(@Param('id', ParseIntPipe) id: number) {
    return this.medicalRecordsService.findOneMedicalRecord(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.medicalRecordsService.findByPatient(patientId);
  }

  @Post('consultations')
  createConsultation(@Body() dto: CreateConsultationDto) {
    return this.medicalRecordsService.createConsultation(dto);
  }

  @Get('consultations/:id')
  findOneConsultation(@Param('id', ParseIntPipe) id: number) {
    return this.medicalRecordsService.findOneConsultation(id);
  }

  @Post(':id/notes')
  createNote(@Param('id', ParseIntPipe) id: number, @Body('note') note: string) {
    return this.medicalRecordsService.createMedicalNote(id, note);
  }

  @Post('allergies')
  createAllergy(@Body() dto: CreateAllergyDto) {
    return this.medicalRecordsService.createAllergy(dto);
  }

  @Get('allergies/patient/:patientId')
  findAllergiesByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.medicalRecordsService.findAllergiesByPatient(patientId);
  }

  @Get('chronic-conditions/patient/:patientId')
  findChronicConditionsByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.medicalRecordsService.findChronicConditionsByPatient(patientId);
  }
}