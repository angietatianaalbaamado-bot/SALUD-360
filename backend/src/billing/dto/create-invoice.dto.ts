import { IsInt, IsPositive, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class InvoiceDetailDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  concept_id: number;

  @ApiProperty()
  concept: string;

  @ApiProperty()
  @IsPositive()
  amount: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ description: 'ID del paciente al que se le factura' })
  @IsInt()
  @IsPositive()
  patient_id: number;

  @ApiProperty({ type: [InvoiceDetailDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InvoiceDetailDto)
  details: InvoiceDetailDto[];
}
