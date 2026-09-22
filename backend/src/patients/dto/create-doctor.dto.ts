import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiPropertyOptional({
    description: 'Usuario existente de Seguridad; null permite desvincularlo',
    type: Number,
    nullable: true,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number | null;

  @ApiProperty({ description: 'Tipo de documento existente', example: 1 })
  @IsInt()
  @IsPositive()
  document_type_id: number;

  @ApiProperty({ example: '1020304050', maxLength: 30 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  document_number: string;

  @ApiProperty({ description: 'Registro profesional único', example: 'RM-12345', maxLength: 80 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  medical_license: string;

  @ApiProperty({ example: 'Ana', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string;

  @ApiPropertyOptional({ type: String, nullable: true, example: 'María', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  middle_name?: string | null;

  @ApiProperty({ example: 'Gómez', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  last_name: string;

  @ApiPropertyOptional({ type: String, nullable: true, example: 'Pérez', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  second_last_name?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true, example: '3001234567', maxLength: 30 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true, example: 'ana@example.com', maxLength: 254 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string | null;

  @ApiPropertyOptional({ default: true })
  @ValidateIf((_object, value) => value !== undefined)
  @IsBoolean()
  is_active?: boolean;
}
