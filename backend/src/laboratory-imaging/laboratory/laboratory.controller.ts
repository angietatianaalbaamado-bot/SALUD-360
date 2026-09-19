import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';

@Controller('laboratory')
export class LaboratoryController {
  constructor(private readonly service: LaboratoryService) {}

  @Get('categories')
  findAllCategories() {
    return this.service.findAllCategories();
  }

  @Post('categories')
  createCategory(@Body() body: any) {
    return this.service.createCategory(body);
  }

  @Get('tests')
  findAllTests() {
    return this.service.findAllTests();
  }

  @Get('tests/:id')
  findTest(@Param('id') id: string) {
    return this.service.findTest(id);
  }

  @Post('tests')
  createTest(@Body() body: any) {
    return this.service.createTest(body);
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

  @Get('orders/:orderId/results')
  findResultsByOrder(@Param('orderId') orderId: string) {
    return this.service.findResultsByOrder(orderId);
  }
}
