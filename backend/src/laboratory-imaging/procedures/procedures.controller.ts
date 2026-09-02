import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly service: ProceduresService) {}

  @Get('types')
  findAllTypes() {
    return this.service.findAllTypes();
  }

  @Post('types')
  createType(@Body() body: any) {
    return this.service.createType(body);
  }

  @Get('surgery-rooms')
  findAllRooms() {
    return this.service.findAllRooms();
  }

  @Post('surgery-rooms')
  createRoom(@Body() body: any) {
    return this.service.createRoom(body);
  }

  @Get()
  findAllProcedures() {
    return this.service.findAllProcedures();
  }

  @Get(':id')
  findProcedure(@Param('id') id: string) {
    return this.service.findProcedure(id);
  }

  @Post()
  createProcedure(@Body() body: any) {
    return this.service.createProcedure(body);
  }

  @Patch(':id')
  updateProcedure(@Param('id') id: string, @Body() body: any) {
    return this.service.updateProcedure(id, body);
  }
}
