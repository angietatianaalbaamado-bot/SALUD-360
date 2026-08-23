import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LaboratoryService } from './laboratory.service';

@ApiTags('Laboratorio e Imágenes')
@Controller('laboratory')
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Get()
  findAll() {
    return this.laboratoryService.findAll();
  }
}
