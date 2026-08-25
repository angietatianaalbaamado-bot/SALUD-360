import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades del Subdominio de Triage
import { Triage } from './triage-domain/entities/triage.entity';
import { VitalSign } from './triage-domain/entities/vital-sign.entity';
import { PainScale } from './triage-domain/entities/pain-scale.entity';
import { TriageLevel } from './triage-domain/entities/triage-level.entity';

// Entidades del Subdominio de Enfermería
import { NursingNote } from './nursing-domain/entities/nursing-note.entity';
import { NursingProcedure } from './nursing-domain/entities/nursing-procedure.entity';
import { NursingShift } from './nursing-domain/entities/nursing-shift.entity';

// Servicios y Controladores
import { TriageService } from './triage.service';
import { TriageController } from './triage.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Entidades de Triage
      Triage,
      VitalSign,
      PainScale,
      TriageLevel,
      // Entidades de Enfermería
      NursingNote,
      NursingProcedure,
      NursingShift,
    ]),
  ],
  controllers: [TriageController],
  providers: [TriageService],
  exports: [TypeOrmModule, TriageService], // Exportamos por si en el futuro otro módulo lo requiere
})
export class TriageModule {}
