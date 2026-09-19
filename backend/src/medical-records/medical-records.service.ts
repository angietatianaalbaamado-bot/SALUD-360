import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicalRecord } from './entities/medical-record.entity';
import { Consultation } from './entities/consultation.entity';
import { Diagnosis } from './entities/diagnosis.entity';
import { Treatment } from './entities/treatment.entity';
import { Prescription } from './entities/prescription.entity';
import { MedicalNote } from './entities/medical-note.entity';
import { Disease } from './entities/disease.entity';
import { Allergy } from './entities/allergy.entity';
import { ChronicCondition } from './entities/chronic-condition.entity';

import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord) private readonly recordRepo: Repository<MedicalRecord>,
    @InjectRepository(Consultation) private readonly consultationRepo: Repository<Consultation>,
    @InjectRepository(Diagnosis) private readonly diagnosisRepo: Repository<Diagnosis>,
    @InjectRepository(Treatment) private readonly treatmentRepo: Repository<Treatment>,
    @InjectRepository(Prescription) private readonly prescriptionRepo: Repository<Prescription>,
    @InjectRepository(MedicalNote) private readonly noteRepo: Repository<MedicalNote>,
    @InjectRepository(Disease) private readonly diseaseRepo: Repository<Disease>,
    @InjectRepository(Allergy) private readonly allergyRepo: Repository<Allergy>,
    @InjectRepository(ChronicCondition)
    private readonly chronicConditionRepo: Repository<ChronicCondition>,
  ) {}

  findAllDiseases(): Promise<Disease[]> {
    return this.diseaseRepo.find();
  }

  async createMedicalRecord(dto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const record = this.recordRepo.create(dto);
    return this.recordRepo.save(record);
  }

  async findOrCreateMedicalRecord(patientId: number, doctorId: number): Promise<MedicalRecord> {
    let record = await this.recordRepo.findOne({ where: { patient_id: patientId } });
    if (!record) {
      record = await this.createMedicalRecord({ patient_id: patientId, doctor_id: doctorId });
    }
    return record;
  }

  async findOneMedicalRecord(id: number): Promise<MedicalRecord> {
    const record = await this.recordRepo.findOne({
      where: { id },
      relations: ['consultations', 'consultations.diagnoses', 'consultations.prescriptions', 'notes'],
    });
    if (!record) throw new NotFoundException(`Historia clínica ${id} no encontrada`);
    return record;
  }

  findByPatient(patientId: number): Promise<MedicalRecord[]> {
    return this.recordRepo.find({
      where: { patient_id: patientId },
      relations: ['consultations'],
    });
  }

  async createConsultation(dto: CreateConsultationDto): Promise<Consultation> {
    const consultation = this.consultationRepo.create({
      medical_record_id: dto.medical_record_id,
      appointment_id: dto.appointment_id,
      reason: dto.reason,
      notes: dto.notes,
      diagnoses: dto.diagnoses?.map((d) =>
        this.diagnosisRepo.create({
          disease_id: d.disease_id,
          description: d.description,
          treatments: d.treatments?.map((t) => this.treatmentRepo.create(t)),
        }),
      ),
      prescriptions: dto.prescriptions?.map((p) => this.prescriptionRepo.create(p)),
    });

    return this.consultationRepo.save(consultation);
  }

  async findOneConsultation(id: number): Promise<Consultation> {
    const consultation = await this.consultationRepo.findOne({
      where: { id },
      relations: ['diagnoses', 'diagnoses.treatments', 'prescriptions'],
    });
    if (!consultation) throw new NotFoundException(`Consulta ${id} no encontrada`);
    return consultation;
  }

  createMedicalNote(medicalRecordId: number, note: string): Promise<MedicalNote> {
    const medicalNote = this.noteRepo.create({ medical_record_id: medicalRecordId, note });
    return this.noteRepo.save(medicalNote);
  }

  createAllergy(dto: CreateAllergyDto): Promise<Allergy> {
    const allergy = this.allergyRepo.create(dto);
    return this.allergyRepo.save(allergy);
  }

  findAllergiesByPatient(patientId: number): Promise<Allergy[]> {
    return this.allergyRepo.find({ where: { patient_id: patientId }, relations: ['disease'] });
  }

  findChronicConditionsByPatient(patientId: number): Promise<ChronicCondition[]> {
    return this.chronicConditionRepo.find({
      where: { patient_id: patientId },
      relations: ['disease'],
    });
  }
}