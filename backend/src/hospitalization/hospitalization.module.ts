import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalizationController } from './hospitalization.controller';
import { HospitalizationService } from './hospitalization.service';
// TODO: importar aquí las entities de este módulo cuando se creen en ./entities

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [HospitalizationController],
  providers: [HospitalizationService],
  exports: [HospitalizationService],
})
export class HospitalizationModule {}
