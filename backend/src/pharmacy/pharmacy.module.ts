import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';

import { Medicine } from './entities/medicine.entity';
import { MedicineCategory } from './entities/medicine-category.entity';
import { PharmaceuticalLaboratory } from './entities/pharmaceutical-laboratory.entity';
import { MedicinePresentation } from './entities/medicine-presentation.entity';
import { MedicineBatch } from './entities/medicine-batch.entity';
import { Inventory } from './entities/inventory.entity';
import { InventoryMovement } from './entities/inventory-movement.entity';
import { MedicationOrder } from './entities/medication-order.entity';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { MedicationAdministration } from './entities/medication-administration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Medicine,
      MedicineCategory,
      PharmaceuticalLaboratory,
      MedicinePresentation,
      MedicineBatch,
      Inventory,
      InventoryMovement,
      MedicationOrder,
      MedicationSchedule,
      MedicationAdministration,
    ]),
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
  exports: [PharmacyService],
})
export class PharmacyModule {}