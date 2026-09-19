import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@ApiTags('Agenda y Citas')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('status')
  findAllStatuses() {
    return this.appointmentsService.findAllStatuses();
  }

  @Get('types')
  findAllTypes() {
    return this.appointmentsService.findAllTypes();
  }

  @Post()
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Get()
  findAllAppointments() {
    return this.appointmentsService.findAllAppointments();
  }

  @Get(':id')
  findOneAppointment(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.findOneAppointment(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.appointmentsService.findByPatient(patientId);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId', ParseIntPipe) doctorId: number) {
    return this.appointmentsService.findByDoctor(doctorId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAppointmentStatusDto) {
    return this.appointmentsService.updateStatus(id, dto);
  }

  @Get('notifications/user/:userId')
  findNotificationsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.appointmentsService.findNotificationsByUser(userId);
  }

  @Patch('notifications/:id/read')
  markNotificationRead(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.markNotificationRead(id);
  }
}