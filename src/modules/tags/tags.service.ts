import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  create(createTagDto: CreateTagDto) {
    return this.tagsRepository.create(createTagDto);
  }

  findAll() {
    return this.tagsRepository.findAll();
  }

  findOne(id: string) {
    return this.tagsRepository.findOne(id);
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return this.tagsRepository.update(id, updateTagDto);
  }

  remove(id: string) {
    return this.tagsRepository.remove(id);
  }
}
