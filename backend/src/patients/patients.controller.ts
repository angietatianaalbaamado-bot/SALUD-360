import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@ApiTags('Pacientes y Médicos')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un paciente' })
  @ApiCreatedResponse({ type: Patient })
  @ApiConflictResponse({ description: 'El documento ya está registrado' })
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pacientes' })
  @ApiOkResponse({ type: Patient, isArray: true })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un paciente por ID' })
  @ApiOkResponse({ type: Patient })
  @ApiNotFoundResponse({ description: 'Paciente no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un paciente' })
  @ApiOkResponse({ type: Patient })
  @ApiNotFoundResponse({ description: 'Paciente no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un paciente sin borrar su historial' })
  @ApiOkResponse({ type: Patient })
  @ApiNotFoundResponse({ description: 'Paciente no encontrado' })
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.deactivate(id);
  }
}
