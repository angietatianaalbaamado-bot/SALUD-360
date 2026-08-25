import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateNursingNoteDto {
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @IsUUID()
  @IsNotEmpty()
  nurseId: string;

  @IsString()
  @IsNotEmpty()
  note: string;
}