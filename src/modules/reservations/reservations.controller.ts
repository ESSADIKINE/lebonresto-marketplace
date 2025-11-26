import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserType.CUSTOMER)
    @ApiBearerAuth()
    async create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(req.user.sub, createReservationDto);
    }

    @Get('my')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserType.CUSTOMER)
    @ApiBearerAuth()
    async findAll(@Request() req) {
        return this.reservationsService.findAllByCustomer(req.user.sub);
    }
}
