import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcedureType } from '../entities/procedure-type.entity';
import { Procedure } from '../entities/procedure.entity';
import { SurgeryRoom } from '../entities/surgery-room.entity';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(ProcedureType)
    private readonly typeRepo: Repository<ProcedureType>,
    @InjectRepository(Procedure)
    private readonly procedureRepo: Repository<Procedure>,
    @InjectRepository(SurgeryRoom)
    private readonly roomRepo: Repository<SurgeryRoom>,
  ) {}

  findAllTypes() {
    return this.typeRepo.find();
  }

  createType(data: Partial<ProcedureType>) {
    return this.typeRepo.save(this.typeRepo.create(data));
  }

  findAllRooms() {
    return this.roomRepo.find();
  }

  createRoom(data: Partial<SurgeryRoom>) {
    return this.roomRepo.save(this.roomRepo.create(data));
  }

  findAllProcedures() {
    return this.procedureRepo.find({
      relations: ['procedureType', 'surgeryRoom'],
    });
  }

  async findProcedure(id: string) {
    const procedure = await this.procedureRepo.findOne({
      where: { id },
      relations: ['procedureType', 'surgeryRoom'],
    });
    if (!procedure) throw new NotFoundException('Procedimiento no encontrado');
    return procedure;
  }

  createProcedure(data: Partial<Procedure>) {
    return this.procedureRepo.save(this.procedureRepo.create(data));
  }

  async updateProcedure(id: string, data: Partial<Procedure>) {
    await this.findProcedure(id);
    await this.procedureRepo.update(id, data);
    return this.findProcedure(id);
  }
}
