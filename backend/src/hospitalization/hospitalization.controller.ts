import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { HospitalizationService } from './hospitalization.service';
import { CreateHospitalizationDto } from './dto/create-hospitalization.dto';
import { UpdateHospitalizationDto } from './dto/update-hospitalization.dto';

@ApiTags('Hospitalización')
@Controller('hospitalization')
export class HospitalizationController {
  constructor(
    private readonly hospitalizationService: HospitalizationService,
  ) {}

  @Get()
  findAll() {
    return this.hospitalizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalizationService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateHospitalizationDto) {
    return this.hospitalizationService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHospitalizationDto,
  ) {
    return this.hospitalizationService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalizationService.remove(Number(id));
  }
}
