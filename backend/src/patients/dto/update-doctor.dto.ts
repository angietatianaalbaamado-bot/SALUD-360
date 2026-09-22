import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

// Los campos obligatorios se pueden omitir, pero no borrar enviando null.
export class UpdateDoctorDto extends PartialType(CreateDoctorDto, {
  skipNullProperties: false,
}) {}
