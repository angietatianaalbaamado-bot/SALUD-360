import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedicalRecordsService } from './medical-records.service';

@ApiTags('Historia Clínica')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalrecordsService: MedicalRecordsService) {}

  @Get()
  findAll() {
    return this.medicalrecordsService.findAll();
  }
}
