import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HospitalizationController } from './hospitalization.controller';
import { HospitalizationService } from './hospitalization.service';

import { Hospitalization } from './entities/hospitalization.entity';
import { RoomType } from './entities/room-type.entity';
import { Room } from './entities/room.entity';
import { Bed } from './entities/bed.entity';
import { BedAssignment } from './entities/bed-assignment.entity';

import { Ambulance } from './entities/ambulance.entity';
import { AmbulanceDriver } from './entities/ambulance-driver.entity';
import { AmbulanceService } from './entities/ambulance-service.entity';

import { Emergency } from './entities/emergency.entity';
import { EmergencyEvent } from './entities/emergency-event.entity';
import { EmergencyPriority } from './entities/emergency-priority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hospitalization,
      RoomType,
      Room,
      Bed,
      BedAssignment,
      Ambulance,
      AmbulanceDriver,
      AmbulanceService,
      Emergency,
      EmergencyEvent,
      EmergencyPriority,
    ]),
  ],
  controllers: [HospitalizationController],
  providers: [HospitalizationService],
  exports: [HospitalizationService],
})
export class HospitalizationModule {}