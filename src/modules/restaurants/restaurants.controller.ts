import { Controller, Get, Post, Body, UseGuards, Request, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../images/cloudinary.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
    constructor(
        private readonly restaurantsService: RestaurantsService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserType.OWNER, UserType.ADMIN)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('logo'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                address: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                phone: { type: 'string' },
                email: { type: 'string' },
                status: { type: 'string', enum: ['basic', 'standard', 'premium'] },
                city_id: { type: 'string' },
                category_id: { type: 'string' },
                logo: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async create(
        @Request() req,
        @Body() createRestaurantDto: CreateRestaurantDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        let logoUrl: string | undefined;
        if (file) {
            const result = await this.cloudinaryService.uploadImage(file);
            logoUrl = result.secure_url;
        }
        return this.restaurantsService.create(req.user.sub, createRestaurantDto, logoUrl);
    }

    @Get()
    async findAll() {
        return this.restaurantsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.restaurantsService.findOne(id);
    }
}
