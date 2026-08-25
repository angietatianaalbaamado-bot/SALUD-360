import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entidades Triage
import { Triage } from './triage-domain/entities/triage.entity';
import { VitalSign } from './triage-domain/entities/vital-sign.entity';
import { PainScale } from './triage-domain/entities/pain-scale.entity';
import { TriageLevel } from './triage-domain/entities/triage-level.entity';

// Entidades Enfermería
import { NursingNote } from './nursing-domain/entities/nursing-note.entity';
import { NursingProcedure } from './nursing-domain/entities/nursing-procedure.entity';
import { NursingShift } from './nursing-domain/entities/nursing-shift.entity';

// DTOs Triage
import { CreateTriageDto } from './triage-domain/dto/create-triage.dto';
import { CreateVitalSignDto } from './triage-domain/dto/create-vital-sign.dto';

// DTOs Enfermería
import { CreateNursingNoteDto } from './nursing-domain/dto/create-nursing-note.dto';
import { CreateNursingProcedureDto } from './nursing-domain/dto/create-nursing-procedure.dto';

@Injectable()
export class TriageService {
  constructor(
    @InjectRepository(Triage)
    private readonly triageRepository: Repository<Triage>,
    @InjectRepository(VitalSign)
    private readonly vitalSignRepository: Repository<VitalSign>,
    @InjectRepository(PainScale)
    private readonly painScaleRepository: Repository<PainScale>,
    @InjectRepository(TriageLevel)
    private readonly triageLevelRepository: Repository<TriageLevel>,
    @InjectRepository(NursingNote)
    private readonly nursingNoteRepository: Repository<NursingNote>,
    @InjectRepository(NursingProcedure)
    private readonly nursingProcedureRepository: Repository<NursingProcedure>,
    @InjectRepository(NursingShift)
    private readonly nursingShiftRepository: Repository<NursingShift>,
  ) {}

  // ==========================================
  //           MÓDULO: TRIAGE
  // ==========================================

  // 1. Crear un nuevo Triage
  async createTriage(createTriageDto: CreateTriageDto): Promise<Triage> {
    const triage = this.triageRepository.create(createTriageDto);
    return await this.triageRepository.save(triage);
  }

  // 2. Registrar Signos Vitales asociados a un Triage
  async createVitalSign(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
    const triage = await this.triageRepository.findOne({ where: { id: createVitalSignDto.triageId } });
    if (!triage) {
      throw new NotFoundException(`El registro de Triage con ID ${createVitalSignDto.triageId} no existe`);
    }
    const vitalSign = this.vitalSignRepository.create(createVitalSignDto);
    return await this.vitalSignRepository.save(vitalSign);
  }

  // 3. Obtener el historial de triages de un paciente
  async getTriagesByPatient(patientId: string): Promise<Triage[]> {
    return await this.triageRepository.find({
      where: { patientId },
      relations: ['triageLevel', 'vitalSigns', 'vitalSigns.painScale'],
      order: { createdAt: 'DESC' },
    });
  }

  // 4. Obtener un Triage por ID
  async getTriageById(id: string): Promise<Triage> {
    const triage = await this.triageRepository.findOne({
      where: { id },
      relations: ['triageLevel', 'vitalSigns', 'vitalSigns.painScale'],
    });
    if (!triage) {
      throw new NotFoundException(`Triage con ID ${id} no encontrado`);
    }
    return triage;
  }

  // 5. Catálogos auxiliares (Niveles de Triage y Escala de Dolor)
  async getTriageLevels(): Promise<TriageLevel[]> {
    return await this.triageLevelRepository.find();
  }

  async getPainScales(): Promise<PainScale[]> {
    return await this.painScaleRepository.find();
  }

  // ==========================================
  //         MÓDULO: ENFERMERÍA
  // ==========================================

  // 1. Registrar una nota de enfermería
  async createNursingNote(createNursingNoteDto: CreateNursingNoteDto): Promise<NursingNote> {
    const note = this.nursingNoteRepository.create(createNursingNoteDto);
    return await this.nursingNoteRepository.save(note);
  }

  // 2. Obtener las notas de enfermería de un paciente
  async getNursingNotesByPatient(patientId: string): Promise<NursingNote[]> {
    return await this.nursingNoteRepository.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  // 3. Registrar un procedimiento aplicado por enfermería
  async createNursingProcedure(createNursingProcedureDto: CreateNursingProcedureDto): Promise<NursingProcedure> {
    const procedure = this.nursingProcedureRepository.create(createNursingProcedureDto);
    return await this.nursingProcedureRepository.save(procedure);
  }

  // 4. Obtener procedimientos realizados a un paciente
  async getNursingProceduresByPatient(patientId: string): Promise<NursingProcedure[]> {
    return await this.nursingProcedureRepository.find({
      where: { patientId },
      order: { performedAt: 'DESC' },
    });
  }
}