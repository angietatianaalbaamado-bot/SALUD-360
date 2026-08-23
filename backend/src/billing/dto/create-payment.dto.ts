import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  invoice_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  payment_method_id: number;

  @ApiProperty()
  @IsPositive()
  amount: number;
}
