import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../images/cloudinary.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.OWNER, UserType.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        restaurant_id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        event_date: { type: 'string' },
        is_paid: { type: 'boolean' },
        price: { type: 'number' },
        requires_reservation: { type: 'boolean' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      imageUrl = result.secure_url;
    }
    return this.eventsService.create(createEventDto, imageUrl);
  }

  @Get('restaurant/:restaurantId')
  async findAll(@Param('restaurantId') restaurantId: string) {
    return this.eventsService.findAllByRestaurant(restaurantId);
  }
}
