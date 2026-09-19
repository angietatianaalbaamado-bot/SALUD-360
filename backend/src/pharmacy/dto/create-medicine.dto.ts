import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  medicine_category_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  laboratory_id?: number;
}