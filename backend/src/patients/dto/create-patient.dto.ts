import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ description: 'Identificador del tipo de documento', example: 1 })
  @IsInt()
  @IsPositive()
  document_type_id: number;

  @ApiProperty({ example: '1020304050' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  document_number: string;

  @ApiProperty({ example: 'Ana' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string;

  @ApiPropertyOptional({ example: 'Maria' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  middle_name?: string;

  @ApiProperty({ example: 'Gomez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  last_name: string;

  @ApiPropertyOptional({ example: 'Perez' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  second_last_name?: string;

  @ApiProperty({ description: 'Fecha en formato AAAA-MM-DD', example: '1995-08-20' })
  @IsDateString({ strict: true })
  birth_date: string;

  @ApiProperty({ description: 'Identificador del género', example: 2 })
  @IsInt()
  @IsPositive()
  gender_id: number;

  @ApiPropertyOptional({ description: 'Identificador del tipo de sangre', example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  blood_type_id?: number;

  @ApiPropertyOptional({ description: 'Identificador del estado civil', example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  marital_status_id?: number;

  @ApiPropertyOptional({ example: 'ana.gomez@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
