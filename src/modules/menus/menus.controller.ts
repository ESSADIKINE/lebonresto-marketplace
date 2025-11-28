import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new menu' })
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menusService.create(createMenuDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all menus' })
    findAll() {
        return this.menusService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a menu by ID' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.menusService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a menu' })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menusService.update(id, updateMenuDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a menu' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.menusService.remove(id);
    }
}
