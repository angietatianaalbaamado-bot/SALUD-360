import { IsInt, IsPositive, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MovementType } from '../entities/inventory-movement.entity';

export class CreateInventoryMovementDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  inventory_id: number;

  @ApiProperty({ enum: MovementType })
  @IsEnum(MovementType)
  movement_type: MovementType;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
