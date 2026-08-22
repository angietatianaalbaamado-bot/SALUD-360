import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyService {
  findAll() {
    return { message: 'Módulo Farmacia - en construcción' };
  }
}
