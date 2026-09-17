import {
  IsInt,
  IsPositive,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TreatmentInputDto {
  @ApiProperty()
  @IsString()
  description: string;
}

class DiagnosisInputDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  disease_id?: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [TreatmentInputDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TreatmentInputDto)
  treatments?: TreatmentInputDto[];
}

class PrescriptionInputDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  medicine_id: number;

  @ApiProperty()
  @IsString()
  dosage: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  duration_days: number;
}

export class CreateConsultationDto {
  @ApiProperty({ description: 'ID de la historia clínica del paciente' })
  @IsInt()
  @IsPositive()
  medical_record_id: number;

  @ApiProperty({ required: false, description: 'ID de la cita asociada, si existe' })
  @IsOptional()
  @IsInt()
  appointment_id?: number;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [DiagnosisInputDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiagnosisInputDto)
  diagnoses?: DiagnosisInputDto[];

  @ApiProperty({ type: [PrescriptionInputDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionInputDto)
  prescriptions?: PrescriptionInputDto[];
}