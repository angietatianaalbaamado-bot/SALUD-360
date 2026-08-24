import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Facturación y Reportes')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // ----- Facturas -----

  @Post('invoices')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billingService.createInvoice(dto);
  }

  @Get('invoices')
  findAllInvoices() {
    return this.billingService.findAllInvoices();
  }

  @Get('invoices/:id')
  findOneInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.billingService.findOneInvoice(id);
  }

  @Patch('invoices/:id')
  updateInvoice(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInvoiceDto) {
    return this.billingService.updateInvoice(id, dto);
  }

  @Delete('invoices/:id')
  removeInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.billingService.removeInvoice(id);
  }

  // ----- Pagos -----

  @Post('payments')
  registerPayment(@Body() dto: CreatePaymentDto) {
    return this.billingService.registerPayment(dto);
  }

  @Get('invoices/:id/payments')
  findPaymentsByInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.billingService.findPaymentsByInvoice(id);
  }

  // ----- Autorizaciones -----

  @Get('authorizations')
  findAllAuthorizations() {
    return this.billingService.findAllAuthorizations();
  }

  // ----- Reportes -----

  @Get('reports')
  findAllReports() {
    return this.billingService.findAllReports();
  }
}
