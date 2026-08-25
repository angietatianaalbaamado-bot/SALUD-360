import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TriageService } from './triage.service';

// DTOs
import { CreateTriageDto } from './triage-domain/dto/create-triage.dto';
import { CreateVitalSignDto } from './triage-domain/dto/create-vital-sign.dto';
import { CreateNursingNoteDto } from './nursing-domain/dto/create-nursing-note.dto';
import { CreateNursingProcedureDto } from './nursing-domain/dto/create-nursing-procedure.dto';

@ApiTags('Triage y Enfermería')
@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  // ==========================================
  //           ENDPOINTS: TRIAGE
  // ==========================================

  @Post()
  createTriage(@Body() createTriageDto: CreateTriageDto) {
    return this.triageService.createTriage(createTriageDto);
  }

  @Post('vital-signs')
  createVitalSign(@Body() createVitalSignDto: CreateVitalSignDto) {
    return this.triageService.createVitalSign(createVitalSignDto);
  }

  @Get('patient/:patientId')
  getTriagesByPatient(@Param('patientId', new ParseUUIDPipe()) patientId: string) {
    return this.triageService.getTriagesByPatient(patientId);
  }

  @Get(':id')
  getTriageById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.triageService.getTriageById(id);
  }

  @Get('catalogs/levels')
  getTriageLevels() {
    return this.triageService.getTriageLevels();
  }

  @Get('catalogs/pain-scales')
  getPainScales() {
    return this.triageService.getPainScales();
  }

  // ==========================================
  //         ENDPOINTS: ENFERMERÍA
  // ==========================================

  @Post('nursing/notes')
  createNursingNote(@Body() createNursingNoteDto: CreateNursingNoteDto) {
    return this.triageService.createNursingNote(createNursingNoteDto);
  }

  @Get('nursing/notes/patient/:patientId')
  getNursingNotesByPatient(@Param('patientId', new ParseUUIDPipe()) patientId: string) {
    return this.triageService.getNursingNotesByPatient(patientId);
  }

  @Post('nursing/procedures')
  createNursingProcedure(@Body() createNursingProcedureDto: CreateNursingProcedureDto) {
    return this.triageService.createNursingProcedure(createNursingProcedureDto);
  }

  @Get('nursing/procedures/patient/:patientId')
  getNursingProceduresByPatient(@Param('patientId', new ParseUUIDPipe()) patientId: string) {
    return this.triageService.getNursingProceduresByPatient(patientId);
  }
}