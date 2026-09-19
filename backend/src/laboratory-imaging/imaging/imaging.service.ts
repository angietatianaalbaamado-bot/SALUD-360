import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagingType } from '../entities/imaging-type.entity';
import { ImagingOrder } from '../entities/imaging-order.entity';
import { ImagingResult } from '../entities/imaging-result.entity';

@Injectable()
export class ImagingService {
  constructor(
    @InjectRepository(ImagingType)
    private readonly typeRepo: Repository<ImagingType>,
    @InjectRepository(ImagingOrder)
    private readonly orderRepo: Repository<ImagingOrder>,
    @InjectRepository(ImagingResult)
    private readonly resultRepo: Repository<ImagingResult>,
  ) {}

  findAllTypes() {
    return this.typeRepo.find();
  }

  createType(data: Partial<ImagingType>) {
    return this.typeRepo.save(this.typeRepo.create(data));
  }

  findAllOrders() {
    return this.orderRepo.find({ relations: ['imagingType', 'results'] });
  }

  async findOrder(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['imagingType', 'results'],
    });
    if (!order) throw new NotFoundException('Orden de imagen no encontrada');
    return order;
  }

  createOrder(data: Partial<ImagingOrder>) {
    return this.orderRepo.save(this.orderRepo.create(data));
  }

  async updateOrder(id: string, data: Partial<ImagingOrder>) {
    await this.findOrder(id);
    await this.orderRepo.update(id, data);
    return this.findOrder(id);
  }

  createResult(data: Partial<ImagingResult>) {
    return this.resultRepo.save(this.resultRepo.create(data));
  }
}
