import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  patient_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  doctor_id: number;
}