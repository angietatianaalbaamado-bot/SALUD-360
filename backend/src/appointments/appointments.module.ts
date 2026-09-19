import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

import { Appointment } from './entities/appointment.entity';
import { AppointmentStatus } from './entities/appointment-status.entity';
import { AppointmentType } from './entities/appointment-type.entity';
import { Notification } from './entities/notification.entity';
import { NotificationTemplate } from './entities/notification-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AppointmentStatus,
      AppointmentType,
      Notification,
      NotificationTemplate,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}