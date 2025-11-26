import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserType.CUSTOMER)
    @ApiBearerAuth()
    async create(@Request() req, @Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.create(req.user.sub, createFeedbackDto);
    }

    @Get('restaurant/:restaurantId')
    async findAll(@Param('restaurantId') restaurantId: string) {
        return this.feedbackService.findAllByRestaurant(restaurantId);
    }
}
