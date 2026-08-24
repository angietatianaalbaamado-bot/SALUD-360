import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HospitalizationService } from './hospitalization.service';

@ApiTags('Hospitalización')
@Controller('hospitalization')
export class HospitalizationController {
  constructor(private readonly hospitalizationService: HospitalizationService) {}

  @Get()
  findAll() {
    return this.hospitalizationService.findAll();
  }
}
