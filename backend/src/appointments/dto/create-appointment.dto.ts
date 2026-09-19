import { IsInt, IsPositive, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  patient_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  doctor_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  appointment_type_id: number;

  @ApiProperty({ description: 'Fecha y hora en formato ISO, ej: 2026-09-20T14:30:00' })
  @IsDateString()
  scheduled_at: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}