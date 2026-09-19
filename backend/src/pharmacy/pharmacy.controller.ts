import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PharmacyService } from './pharmacy.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { CreateMedicineBatchDto } from './dto/create-medicine-batch.dto';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { CreateMedicationOrderDto } from './dto/create-medication-order.dto';

@ApiTags('Farmacia')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('categories')
  findAllCategories() {
    return this.pharmacyService.findAllCategories();
  }

  @Get('laboratories')
  findAllLaboratories() {
    return this.pharmacyService.findAllLaboratories();
  }

  @Post('medicines')
  createMedicine(@Body() dto: CreateMedicineDto) {
    return this.pharmacyService.createMedicine(dto);
  }

  @Get('medicines')
  findAllMedicines() {
    return this.pharmacyService.findAllMedicines();
  }

  @Get('medicines/:id')
  findOneMedicine(@Param('id', ParseIntPipe) id: number) {
    return this.pharmacyService.findOneMedicine(id);
  }

  @Post('batches')
  createBatch(@Body() dto: CreateMedicineBatchDto) {
    return this.pharmacyService.createBatchWithInventory(dto);
  }

  @Post('inventory/movements')
  registerMovement(@Body() dto: CreateInventoryMovementDto) {
    return this.pharmacyService.registerMovement(dto);
  }

  @Get('inventory/low-stock')
  findLowStock(@Query('threshold') threshold?: string) {
    return this.pharmacyService.findLowStock(threshold ? Number(threshold) : undefined);
  }

  @Get('inventory/expiring-soon')
  findExpiringSoon(@Query('days') days?: string) {
    return this.pharmacyService.findExpiringSoon(days ? Number(days) : undefined);
  }

  @Post('medication-orders')
  createMedicationOrder(@Body() dto: CreateMedicationOrderDto) {
    return this.pharmacyService.createMedicationOrder(dto);
  }

  @Get('medication-orders/record/:medicalRecordId')
  findMedicationOrdersByRecord(@Param('medicalRecordId', ParseIntPipe) medicalRecordId: number) {
    return this.pharmacyService.findMedicationOrdersByRecord(medicalRecordId);
  }
}