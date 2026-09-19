import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Medicine } from './entities/medicine.entity';
import { MedicineCategory } from './entities/medicine-category.entity';
import { PharmaceuticalLaboratory } from './entities/pharmaceutical-laboratory.entity';
import { MedicineBatch } from './entities/medicine-batch.entity';
import { Inventory } from './entities/inventory.entity';
import { InventoryMovement, MovementType } from './entities/inventory-movement.entity';
import { MedicationOrder } from './entities/medication-order.entity';

import { CreateMedicineDto } from './dto/create-medicine.dto';
import { CreateMedicineBatchDto } from './dto/create-medicine-batch.dto';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { CreateMedicationOrderDto } from './dto/create-medication-order.dto';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(Medicine) private readonly medicineRepo: Repository<Medicine>,
    @InjectRepository(MedicineCategory)
    private readonly categoryRepo: Repository<MedicineCategory>,
    @InjectRepository(PharmaceuticalLaboratory)
    private readonly labRepo: Repository<PharmaceuticalLaboratory>,
    @InjectRepository(MedicineBatch) private readonly batchRepo: Repository<MedicineBatch>,
    @InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>,
    @InjectRepository(InventoryMovement)
    private readonly movementRepo: Repository<InventoryMovement>,
    @InjectRepository(MedicationOrder)
    private readonly medicationOrderRepo: Repository<MedicationOrder>,
  ) {}

  findAllCategories(): Promise<MedicineCategory[]> {
    return this.categoryRepo.find();
  }

  findAllLaboratories(): Promise<PharmaceuticalLaboratory[]> {
    return this.labRepo.find();
  }

  createMedicine(dto: CreateMedicineDto): Promise<Medicine> {
    const medicine = this.medicineRepo.create(dto);
    return this.medicineRepo.save(medicine);
  }

  findAllMedicines(): Promise<Medicine[]> {
    return this.medicineRepo.find({ relations: ['category', 'laboratory'] });
  }

  async findOneMedicine(id: number): Promise<Medicine> {
    const medicine = await this.medicineRepo.findOne({
      where: { id },
      relations: ['category', 'laboratory', 'presentations', 'batches'],
    });
    if (!medicine) throw new NotFoundException(`Medicamento ${id} no encontrado`);
    return medicine;
  }

  async createBatchWithInventory(dto: CreateMedicineBatchDto): Promise<MedicineBatch> {
    const medicine = await this.findOneMedicine(dto.medicine_id);
    if (!medicine) throw new NotFoundException(`Medicamento ${dto.medicine_id} no encontrado`);

    const batch = this.batchRepo.create({
      medicine_id: dto.medicine_id,
      batch_number: dto.batch_number,
      expiration_date: dto.expiration_date,
    });
    const savedBatch = await this.batchRepo.save(batch);

    const inventory = this.inventoryRepo.create({
      medicine_batch_id: savedBatch.id,
      quantity: dto.initial_quantity,
    });
    const savedInventory = await this.inventoryRepo.save(inventory);

    await this.movementRepo.save(
      this.movementRepo.create({
        inventory_id: savedInventory.id,
        movement_type: MovementType.ENTRADA,
        quantity: dto.initial_quantity,
      }),
    );

    return savedBatch;
  }

  async registerMovement(dto: CreateInventoryMovementDto): Promise<InventoryMovement> {
    const inventory = await this.inventoryRepo.findOne({ where: { id: dto.inventory_id } });
    if (!inventory) throw new NotFoundException(`Inventario ${dto.inventory_id} no encontrado`);

    if (dto.movement_type === MovementType.SALIDA && inventory.quantity < dto.quantity) {
      throw new BadRequestException('No hay suficiente cantidad en inventario para esta salida.');
    }

    if (dto.movement_type === MovementType.ENTRADA) {
      inventory.quantity += dto.quantity;
    } else if (dto.movement_type === MovementType.SALIDA) {
      inventory.quantity -= dto.quantity;
    } else {
      inventory.quantity = dto.quantity;
    }
    await this.inventoryRepo.save(inventory);

    const movement = this.movementRepo.create(dto);
    return this.movementRepo.save(movement);
  }

  findLowStock(threshold = 10): Promise<Inventory[]> {
    return this.inventoryRepo
      .createQueryBuilder('inv')
      .leftJoinAndSelect('inv.batch', 'batch')
      .leftJoinAndSelect('batch.medicine', 'medicine')
      .where('inv.quantity <= :threshold', { threshold })
      .getMany();
  }

  findExpiringSoon(days = 30): Promise<MedicineBatch[]> {
    return this.batchRepo
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.medicine', 'medicine')
      .where('batch.expiration_date <= CURRENT_DATE + make_interval(days := :days)', { days })
      .orderBy('batch.expiration_date', 'ASC')
      .getMany();
  }

  createMedicationOrder(dto: CreateMedicationOrderDto): Promise<MedicationOrder> {
    const order = this.medicationOrderRepo.create(dto);
    return this.medicationOrderRepo.save(order);
  }

  findMedicationOrdersByRecord(medicalRecordId: number): Promise<MedicationOrder[]> {
    return this.medicationOrderRepo.find({
      where: { medical_record_id: medicalRecordId },
      relations: ['medicine', 'schedule'],
    });
  }
}