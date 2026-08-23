import { Injectable } from '@nestjs/common';

@Injectable()
export class HospitalizationService {
  findAll() {
    return { message: 'Módulo Hospitalización - en construcción' };
  }
}
