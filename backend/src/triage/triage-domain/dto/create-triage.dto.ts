import { IsUUID, IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTriageDto {
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @IsUUID()
  @IsOptional()
  performedByUserId?: string;

  @IsInt()
  @IsNotEmpty()
  triageLevelId: number;

  @IsString()
  @IsNotEmpty()
  chiefComplaint: string;

  @IsString()
  @IsOptional()
  observations?: string;
}