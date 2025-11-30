import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CloudinaryService } from '../images/cloudinary.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search restaurants' })
  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'tagId', required: false })
  @ApiQuery({ name: 'q', required: false })
  search(
    @Query('cityId') cityId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('tagId') tagId?: string,
    @Query('q') q?: string,
  ) {
    return this.restaurantsService.search({ cityId, categoryId, tagId, q });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.remove(id);
  }

  // Relational Endpoints

  @Get(':id/menus')
  @ApiOperation({ summary: 'Get menus for a restaurant' })
  getMenus(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getMenus(id);
  }

  @Get(':id/plats')
  @ApiOperation({ summary: 'Get plats for a restaurant' })
  getPlats(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getPlats(id);
  }

  @Get(':id/images')
  @ApiOperation({ summary: 'Get images for a restaurant' })
  getImages(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getImages(id);
  }

  @Get(':id/tags')
  @ApiOperation({ summary: 'Get tags for a restaurant' })
  getTags(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getTags(id);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get events for a restaurant' })
  getEvents(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getEvents(id);
  }

  @Get(':id/reservations')
  @ApiOperation({ summary: 'Get reservations for a restaurant' })
  getReservations(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getReservations(id);
  }

  @Get(':id/feedback')
  @ApiOperation({ summary: 'Get feedback for a restaurant' })
  getFeedback(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getFeedback(id);
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get summary for a restaurant' })
  getSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.getSummary(id);
  }

  @Post(':id/images')
  @ApiOperation({ summary: 'Add an image to a restaurant (URL)' })
  addImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() imageData: { url: string; label?: string },
  ) {
    return this.restaurantsService.addImage(id, imageData.url, imageData.label);
  }

  @Post(':id/upload-image')
  @ApiOperation({
    summary: 'Upload one or multiple image files to a restaurant',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Image files to upload (max 10)',
        },
        label: {
          type: 'string',
          description: 'Label for all images (optional)',
        },
        labels: {
          type: 'array',
          items: { type: 'string' },
          description: 'Individual labels for each image (optional)',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { label?: string; labels?: string[] },
  ) {
    return this.restaurantsService.uploadMultipleImages(id, files, body);
  }

  @Post(':id/tags/:tagId')
  @ApiOperation({ summary: 'Link a tag to a restaurant' })
  addTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.restaurantsService.addTag(id, tagId);
  }

  @Post(':id/tags')
  @ApiOperation({ summary: 'Link multiple tags to a restaurant' })
  addTags(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { tag_ids: string[] },
  ) {
    return this.restaurantsService.addTags(id, body.tag_ids);
  }
}
