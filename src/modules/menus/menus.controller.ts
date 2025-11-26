import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserType.OWNER, UserType.ADMIN)
    @ApiBearerAuth()
    async create(@Body() createMenuDto: CreateMenuDto) {
        return this.menusService.create(createMenuDto);
    }

    @Get('restaurant/:restaurantId')
    async findAll(@Param('restaurantId') restaurantId: string) {
        return this.menusService.findAllByRestaurant(restaurantId);
    }
}
