import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ImagingService } from './imaging.service';

@Controller('imaging')
export class ImagingController {
  constructor(private readonly service: ImagingService) {}

  @Get('types')
  findAllTypes() {
    return this.service.findAllTypes();
  }

  @Post('types')
  createType(@Body() body: any) {
    return this.service.createType(body);
  }

  @Get('orders')
  findAllOrders() {
    return this.service.findAllOrders();
  }

  @Get('orders/:id')
  findOrder(@Param('id') id: string) {
    return this.service.findOrder(id);
  }

  @Post('orders')
  createOrder(@Body() body: any) {
    return this.service.createOrder(body);
  }

  @Patch('orders/:id')
  updateOrder(@Param('id') id: string, @Body() body: any) {
    return this.service.updateOrder(id, body);
  }

  @Post('results')
  createResult(@Body() body: any) {
    return this.service.createResult(body);
  }
}
