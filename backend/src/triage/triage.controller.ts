import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TriageService } from './triage.service';

@ApiTags('Triage y Enfermería')
@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  @Get()
  findAll() {
    return this.triageService.findAll();
  }
}
