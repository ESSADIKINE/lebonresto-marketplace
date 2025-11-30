import { Injectable } from '@nestjs/common';
import { OwnersRepository } from './owners.repository';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
  constructor(private readonly ownersRepository: OwnersRepository) {}

  async create(createOwnerDto: CreateOwnerDto) {
    // Hash the password
    const password_hash = await bcrypt.hash(createOwnerDto.password, 10);

    // Map DTO to database fields
    const ownerData = {
      email: createOwnerDto.email,
      password_hash,
      name: createOwnerDto.name ?? null,
      phone: createOwnerDto.phone ?? null,
      avatar_url: createOwnerDto.avatar_url ?? null,
      company_name: createOwnerDto.company_name ?? null,
      vat_number: createOwnerDto.vat_number ?? null,
    };

    // Create owner in database
    const owner = await this.ownersRepository.create(ownerData);

    // Remove password_hash from response
    const { password_hash: _, ...ownerWithoutPassword } = owner;

    return ownerWithoutPassword;
  }

  findAll() {
    return this.ownersRepository.findAll();
  }

  findOne(id: string) {
    return this.ownersRepository.findOne(id);
  }

  update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return this.ownersRepository.update(id, updateOwnerDto);
  }

  remove(id: string) {
    return this.ownersRepository.remove(id);
  }

  findOneByEmail(email: string) {
    return this.ownersRepository.findOneByEmail(email);
  }
}
