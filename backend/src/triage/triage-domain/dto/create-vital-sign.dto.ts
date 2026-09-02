import { IsUUID, IsNotEmpty, IsOptional, IsNumber, IsInt, Min, Max } from 'class-validator';

export class CreateVitalSignDto {
  @IsUUID()
  @IsNotEmpty()
  triageId: string;

  @IsInt()
  @IsOptional()
  painScaleId?: number;

  @IsNumber()
  @IsOptional()
  @Min(30)
  @Max(45)
  temperature?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(300)
  heartRate?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100)
  respiratoryRate?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(300)
  systolicPressure?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(200)
  diastolicPressure?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  oxygenSaturation?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  height?: number;
}