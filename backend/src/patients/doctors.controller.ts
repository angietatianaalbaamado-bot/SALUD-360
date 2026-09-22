import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { DoctorsService } from './doctors.service';

@ApiTags('Médicos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Se requiere un token JWT válido' })
@ApiBadRequestResponse({ description: 'Datos inválidos o referencia inexistente' })
@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un médico' })
  @ApiCreatedResponse({ type: Doctor })
  @ApiConflictResponse({ description: 'Documento, registro profesional o usuario duplicado' })
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar médicos activos e inactivos por apellido y nombre' })
  @ApiOkResponse({ type: Doctor, isArray: true })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar los datos básicos de un médico' })
  @ApiOkResponse({ type: Doctor })
  @ApiNotFoundResponse({ description: 'Médico no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente los datos de un médico' })
  @ApiOkResponse({ type: Doctor })
  @ApiNotFoundResponse({ description: 'Médico no encontrado' })
  @ApiConflictResponse({ description: 'Documento, registro profesional o usuario duplicado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un médico sin borrar su historial' })
  @ApiOkResponse({ type: Doctor })
  @ApiNotFoundResponse({ description: 'Médico no encontrado' })
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.deactivate(id);
  }
}
