import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from './entities/appointment.entity';
import { AppointmentStatus } from './entities/appointment-status.entity';
import { AppointmentType } from './entities/appointment-type.entity';
import { Notification } from './entities/notification.entity';
import { NotificationTemplate } from './entities/notification-template.entity';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

const CANCELLED_STATUS_NAME = 'Cancelada';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(AppointmentStatus)
    private readonly statusRepo: Repository<AppointmentStatus>,
    @InjectRepository(AppointmentType) private readonly typeRepo: Repository<AppointmentType>,
    @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationTemplate)
    private readonly templateRepo: Repository<NotificationTemplate>,
  ) {}

  findAllStatuses(): Promise<AppointmentStatus[]> {
    return this.statusRepo.find();
  }

  findAllTypes(): Promise<AppointmentType[]> {
    return this.typeRepo.find();
  }

  async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
    const cancelled = await this.statusRepo.findOne({ where: { name: CANCELLED_STATUS_NAME } });

    const conflict = await this.appointmentRepo
      .createQueryBuilder('a')
      .where('a.doctor_id = :doctorId', { doctorId: dto.doctor_id })
      .andWhere('a.scheduled_at = :scheduledAt', { scheduledAt: dto.scheduled_at })
      .andWhere(cancelled ? 'a.appointment_status_id != :cancelledId' : '1=1', {
        cancelledId: cancelled?.id,
      })
      .getOne();

    if (conflict) {
      throw new ConflictException('El doctor ya tiene una cita programada a esa hora.');
    }

    const programada = await this.statusRepo.findOne({ where: { name: 'Programada' } });

    const appointment = this.appointmentRepo.create({
      patient_id: dto.patient_id,
      doctor_id: dto.doctor_id,
      appointment_type_id: dto.appointment_type_id,
      appointment_status_id: programada?.id,
      scheduled_at: new Date(dto.scheduled_at),
      reason: dto.reason,
    });

    return this.appointmentRepo.save(appointment);
  }

  findAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      relations: ['appointmentType', 'appointmentStatus'],
      order: { scheduled_at: 'ASC' },
    });
  }

  async findOneAppointment(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['appointmentType', 'appointmentStatus'],
    });
    if (!appointment) throw new NotFoundException(`Cita ${id} no encontrada`);
    return appointment;
  }

  findByPatient(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: { patient_id: patientId },
      relations: ['appointmentType', 'appointmentStatus'],
      order: { scheduled_at: 'DESC' },
    });
  }

  findByDoctor(doctorId: number): Promise<Appointment[]> {
    return this.appointmentRepo.find({
      where: { doctor_id: doctorId },
      relations: ['appointmentType', 'appointmentStatus'],
      order: { scheduled_at: 'ASC' },
    });
  }

  async updateStatus(id: number, dto: UpdateAppointmentStatusDto): Promise<Appointment> {
    const appointment = await this.findOneAppointment(id);
    appointment.appointment_status_id = dto.appointment_status_id;
    return this.appointmentRepo.save(appointment);
  }

  findNotificationsByUser(userId: number): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { user_id: userId },
      relations: ['template', 'appointment'],
      order: { created_at: 'DESC' },
    });
  }

  async markNotificationRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException(`Notificación ${id} no encontrada`);
    notification.is_read = true;
    return this.notificationRepo.save(notification);
  }
}