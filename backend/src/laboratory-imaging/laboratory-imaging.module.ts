import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LaboratoryCategory } from './entities/laboratory-category.entity';
import { LaboratoryTest } from './entities/laboratory-test.entity';
import { LaboratoryOrder } from './entities/laboratory-order.entity';
import { LaboratoryResult } from './entities/laboratory-result.entity';
import { ImagingType } from './entities/imaging-type.entity';
import { ImagingOrder } from './entities/imaging-order.entity';
import { ImagingResult } from './entities/imaging-result.entity';
import { ProcedureType } from './entities/procedure-type.entity';
import { Procedure } from './entities/procedure.entity';
import { SurgeryRoom } from './entities/surgery-room.entity';
import { Vaccine } from './entities/vaccine.entity';
import { VaccinationRecord } from './entities/vaccination-record.entity';

import { LaboratoryService } from './laboratory/laboratory.service';
import { LaboratoryController } from './laboratory/laboratory.controller';
import { ImagingService } from './imaging/imaging.service';
import { ImagingController } from './imaging/imaging.controller';
import { ProceduresService } from './procedures/procedures.service';
import { ProceduresController } from './procedures/procedures.controller';
import { VaccinationService } from './vaccination/vaccination.service';
import { VaccinationController } from './vaccination/vaccination.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LaboratoryCategory,
      LaboratoryTest,
      LaboratoryOrder,
      LaboratoryResult,
      ImagingType,
      ImagingOrder,
      ImagingResult,
      ProcedureType,
      Procedure,
      SurgeryRoom,
      Vaccine,
      VaccinationRecord,
    ]),
  ],
  controllers: [
    LaboratoryController,
    ImagingController,
    ProceduresController,
    VaccinationController,
  ],
  providers: [
    LaboratoryService,
    ImagingService,
    ProceduresService,
    VaccinationService,
  ],
})
export class LaboratoryImagingModule {}
