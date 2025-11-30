import { Injectable } from '@nestjs/common';
import { PlatsRepository } from './plats.repository';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';

@Injectable()
export class PlatsService {
  constructor(private readonly platsRepository: PlatsRepository) {}

  create(createPlatDto: CreatePlatDto) {
    return this.platsRepository.create(createPlatDto);
  }

  findAll() {
    return this.platsRepository.findAll();
  }

  findOne(id: string) {
    return this.platsRepository.findOne(id);
  }

  update(id: string, updatePlatDto: UpdatePlatDto) {
    return this.platsRepository.update(id, updatePlatDto);
  }

  remove(id: string) {
    return this.platsRepository.remove(id);
  }
}
