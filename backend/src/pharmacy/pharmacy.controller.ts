import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PharmacyService } from './pharmacy.service';

@ApiTags('Farmacia')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get()
  findAll() {
    return this.pharmacyService.findAll();
  }
}
