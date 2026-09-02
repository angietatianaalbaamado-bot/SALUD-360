import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaboratoryCategory } from '../entities/laboratory-category.entity';
import { LaboratoryTest } from '../entities/laboratory-test.entity';
import { LaboratoryOrder } from '../entities/laboratory-order.entity';
import { LaboratoryResult } from '../entities/laboratory-result.entity';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(LaboratoryCategory)
    private readonly categoryRepo: Repository<LaboratoryCategory>,
    @InjectRepository(LaboratoryTest)
    private readonly testRepo: Repository<LaboratoryTest>,
    @InjectRepository(LaboratoryOrder)
    private readonly orderRepo: Repository<LaboratoryOrder>,
    @InjectRepository(LaboratoryResult)
    private readonly resultRepo: Repository<LaboratoryResult>,
  ) {}

  // --- CategorÃ­as ---
  findAllCategories() {
    return this.categoryRepo.find();
  }

  createCategory(data: Partial<LaboratoryCategory>) {
    return this.categoryRepo.save(this.categoryRepo.create(data));
  }

  // --- Pruebas ---
  findAllTests() {
    return this.testRepo.find({ relations: ['category'] });
  }

  async findTest(id: string) {
    const test = await this.testRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!test) throw new NotFoundException('Prueba de laboratorio no encontrada');
    return test;
  }

  createTest(data: Partial<LaboratoryTest>) {
    return this.testRepo.save(this.testRepo.create(data));
  }

  // --- Ã“rdenes ---
  findAllOrders() {
    return this.orderRepo.find({ relations: ['results', 'results.test'] });
  }

  async findOrder(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['results', 'results.test'],
    });
    if (!order) throw new NotFoundException('Orden de laboratorio no encontrada');
    return order;
  }

  createOrder(data: Partial<LaboratoryOrder>) {
    return this.orderRepo.save(this.orderRepo.create(data));
  }

  async updateOrder(id: string, data: Partial<LaboratoryOrder>) {
    await this.findOrder(id);
    await this.orderRepo.update(id, data);
    return this.findOrder(id);
  }

  // --- Resultados ---
  createResult(data: Partial<LaboratoryResult>) {
    return this.resultRepo.save(this.resultRepo.create(data));
  }

  findResultsByOrder(orderId: string) {
    return this.resultRepo.find({
      where: { orderId },
      relations: ['test'],
    });
  }
}
