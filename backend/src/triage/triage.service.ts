import { Injectable } from '@nestjs/common';

@Injectable()
export class TriageService {
  findAll() {
    return { message: 'Módulo Triage y Enfermería - en construcción' };
  }
}
