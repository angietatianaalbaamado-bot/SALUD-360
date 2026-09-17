import { IsInt, IsPositive, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AllergySeverity } from '../entities/allergy.entity';

export class CreateAllergyDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  patient_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  disease_id?: number;

  @ApiProperty({ enum: AllergySeverity, required: false })
  @IsOptional()
  @IsEnum(AllergySeverity)
  severity?: AllergySeverity;
}