import { Injectable } from '@nestjs/common';
import { OwnersRepository } from './owners.repository';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
    constructor(private readonly ownersRepository: OwnersRepository) { }

    create(createOwnerDto: CreateOwnerDto | any) {
        return this.ownersRepository.create(createOwnerDto);
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
