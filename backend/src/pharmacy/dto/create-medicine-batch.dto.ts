import { IsInt, IsPositive, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineBatchDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  medicine_id: number;

  @ApiProperty()
  @IsString()
  batch_number: string;

  @ApiProperty({ description: 'Formato ISO, ej: 2027-06-30' })
  @IsDateString()
  expiration_date: string;

  @ApiProperty({ description: 'Cantidad inicial que entra al inventario' })
  @IsInt()
  @IsPositive()
  initial_quantity: number;
}