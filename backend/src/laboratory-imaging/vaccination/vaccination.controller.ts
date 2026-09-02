import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VaccinationService } from './vaccination.service';

@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly service: VaccinationService) {}

  @Get('vaccines')
  findAllVaccines() {
    return this.service.findAllVaccines();
  }

  @Post('vaccines')
  createVaccine(@Body() body: any) {
    return this.service.createVaccine(body);
  }

  @Get('records')
  findAllRecords() {
    return this.service.findAllRecords();
  }

  @Get('records/patient/:patientId')
  findRecordsByPatient(@Param('patientId') patientId: number) {
    return this.service.findRecordsByPatient(patientId);
  }

  @Post('records')
  createRecord(@Body() body: any) {
    return this.service.createRecord(body);
  }
}
