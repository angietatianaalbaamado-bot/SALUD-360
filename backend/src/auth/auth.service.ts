import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { AuditLog } from './entities/audit-log.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(AuditLog) private readonly auditLogRepo: Repository<AuditLog>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Omit<User, 'password_hash'>> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Ya existe un usuario registrado con este correo');
    }

    const password_hash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = this.userRepo.create({
      full_name: dto.full_name,
      email: dto.email,
      password_hash,
    });
    const saved = await this.userRepo.save(user);

    await this.logAction(saved.id, 'register', 'users');

    const { password_hash: _omit, ...safeUser } = saved;
    return safeUser;
  }

  async login(dto: LoginDto): Promise<{ access_token: string; user: Omit<User, 'password_hash'> }> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !user.is_active) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const access_token = this.jwtService.sign({ sub: user.id, email: user.email });

    await this.logAction(user.id, 'login', 'users');

    const { password_hash: _omit, ...safeUser } = user;
    return { access_token, user: safeUser };
  }

  async findById(id: number): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['roles'] });
    if (!user) return null;
    const { password_hash: _omit, ...safeUser } = user;
    return safeUser;
  }

  private async logAction(userId: number, action: string, entity: string): Promise<void> {
    const log = this.auditLogRepo.create({ user_id: userId, action, entity });
    await this.auditLogRepo.save(log);
  }
}
