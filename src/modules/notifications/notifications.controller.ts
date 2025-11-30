import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Request() req) {
    return this.notificationsService.findAllByUser(req.user.sub);
  }

  @Patch(':id/seen')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async markAsSeen(@Param('id') id: string) {
    return this.notificationsService.markAsSeen(id);
  }
}
