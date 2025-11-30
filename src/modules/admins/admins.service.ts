import { Injectable } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  create(createAdminDto: CreateAdminDto | any) {
    return this.adminsRepository.create(createAdminDto);
  }

  findAll() {
    return this.adminsRepository.findAll();
  }

  findOne(id: string) {
    return this.adminsRepository.findOne(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminsRepository.update(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminsRepository.remove(id);
  }

  findOneByEmail(email: string) {
    return this.adminsRepository.findOneByEmail(email);
  }
}
