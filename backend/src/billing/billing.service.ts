import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Payment } from './entities/payment.entity';
import { Authorization } from './entities/authorization.entity';
import { Report } from './entities/report.entity';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private readonly invoiceDetailRepo: Repository<InvoiceDetail>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Authorization)
    private readonly authorizationRepo: Repository<Authorization>,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {}

  // ---------- Facturas ----------

  async createInvoice(dto: CreateInvoiceDto): Promise<Invoice> {
    const total = dto.details.reduce((sum, d) => sum + Number(d.amount), 0);

    const invoice = this.invoiceRepo.create({
      patient_id: dto.patient_id,
      total,
      status: InvoiceStatus.PENDING,
      details: dto.details.map((d) =>
        this.invoiceDetailRepo.create({ concept: d.concept, amount: d.amount }),
      ),
    });

    return this.invoiceRepo.save(invoice);
  }

  findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceRepo.find({ relations: ['details', 'payments'] });
  }

  async findOneInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: ['details', 'payments'],
    });
    if (!invoice) throw new NotFoundException(`Factura ${id} no encontrada`);
    return invoice;
  }

  async updateInvoice(id: number, dto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOneInvoice(id);
    Object.assign(invoice, dto);
    return this.invoiceRepo.save(invoice);
  }

  async removeInvoice(id: number): Promise<void> {
    const invoice = await this.findOneInvoice(id);
    await this.invoiceRepo.remove(invoice);
  }

  // ---------- Pagos ----------

  async registerPayment(dto: CreatePaymentDto): Promise<Payment> {
    const invoice = await this.findOneInvoice(dto.invoice_id);

    const payment = this.paymentRepo.create(dto);
    await this.paymentRepo.save(payment);

    const totalPaid = (invoice.payments ?? []).reduce((sum, p) => sum + Number(p.amount), 0) + Number(dto.amount);

    invoice.status =
      totalPaid >= Number(invoice.total) ? InvoiceStatus.PAID : InvoiceStatus.PARTIAL;
    await this.invoiceRepo.save(invoice);

    return payment;
  }

  findPaymentsByInvoice(invoiceId: number): Promise<Payment[]> {
    return this.paymentRepo.find({ where: { invoice_id: invoiceId } });
  }

  // ---------- Autorizaciones EPS ----------

  findAllAuthorizations(): Promise<Authorization[]> {
    return this.authorizationRepo.find();
  }

  // ---------- Reportes ----------

  findAllReports(): Promise<Report[]> {
    return this.reportRepo.find({ relations: ['exports'] });
  }
}
