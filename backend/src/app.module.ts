import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { TriageModule } from './triage/triage.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { HospitalizationModule } from './hospitalization/hospitalization.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '5432', 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ solo en desarrollo, nunca en producción
      }),
    }),

    // Módulo 1 - Seguridad y Accesos
    AuthModule,
    // Módulo 2 - Pacientes y Médicos
    PatientsModule,
    // Módulo 3 - Agenda y Citas
    AppointmentsModule,
    // Módulo 4 - Historia Clínica
    MedicalRecordsModule,
    // Módulo 5 - Triage y Enfermería
    TriageModule,
    // Módulo 6 - Farmacia
    PharmacyModule,
    // Módulo 7 - Laboratorio e Imágenes
    LaboratoryModule,
    // Módulo 8 - Hospitalización
    HospitalizationModule,
    // Módulo 9 - Facturación y Reportes (Tatiana Alba)
    BillingModule,
  ],
})
export class AppModule {}
