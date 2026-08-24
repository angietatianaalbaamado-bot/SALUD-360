import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {
  findAll() {
    return { message: 'Módulo Pacientes y Médicos - en construcción' };
  }
}
