import { IsInt, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicationOrderDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  medical_record_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  medicine_id: number;

  @ApiProperty()
  @IsString()
  dosage: string;
}