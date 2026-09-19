import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentStatusDto {
  @ApiProperty({ description: 'ID del nuevo estado (ver GET /appointments/status)' })
  @IsInt()
  @IsPositive()
  appointment_status_id: number;
}