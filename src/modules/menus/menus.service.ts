import { Injectable } from '@nestjs/common';
import { MenusRepository } from './menus.repository';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
    constructor(private readonly menusRepository: MenusRepository) { }

    create(createMenuDto: CreateMenuDto) {
        return this.menusRepository.create(createMenuDto);
    }

    findAll() {
        return this.menusRepository.findAll();
    }

    findOne(id: string) {
        return this.menusRepository.findOne(id);
    }

    update(id: string, updateMenuDto: UpdateMenuDto) {
        return this.menusRepository.update(id, updateMenuDto);
    }

    remove(id: string) {
        return this.menusRepository.remove(id);
    }
}
