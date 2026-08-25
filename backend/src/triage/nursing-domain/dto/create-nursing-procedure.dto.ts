import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNursingProcedureDto {
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @IsUUID()
  @IsNotEmpty()
  nurseId: string;

  @IsString()
  @IsNotEmpty()
  procedureName: string;

  @IsString()
  @IsOptional()
  description?: string;
}