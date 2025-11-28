import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) { }

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
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
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

    @Post(':id/create-drive-folder')
    @ApiOperation({ summary: 'Créer ou récupérer le dossier Google Drive pour ce restaurant' })
    createDriveFolder(@Param('id', ParseUUIDPipe) id: string) {
        return this.restaurantsService.createDriveFolderForRestaurant(id);
    }
}
