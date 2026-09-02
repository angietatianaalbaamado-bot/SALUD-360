import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateHospitalizationDto {
  @IsInt()
  patient_id: number;

  @IsDateString()
  admission_date: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsDateString()
  discharge_date?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  observations?: string;
}