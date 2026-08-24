import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Payment } from './entities/payment.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Eps } from './entities/eps.entity';
import { InsurancePlan } from './entities/insurance-plan.entity';
import { Authorization } from './entities/authorization.entity';
import { Report } from './entities/report.entity';
import { ReportExport } from './entities/report-export.entity';
import { Setting } from './entities/settings.entity';
import { Country } from './entities/country.entity';
import { Department } from './entities/department.entity';
import { City } from './entities/city.entity';
import { DocumentType } from './entities/document-type.entity';
import { Gender } from './entities/gender.entity';
import { BloodType } from './entities/blood-type.entity';
import { MaritalStatus } from './entities/marital-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceDetail,
      Payment,
      PaymentMethod,
      Eps,
      InsurancePlan,
      Authorization,
      Report,
      ReportExport,
      Setting,
      Country,
      Department,
      City,
      DocumentType,
      Gender,
      BloodType,
      MaritalStatus,
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
