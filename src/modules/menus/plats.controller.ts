import { Controller, Get, Post, Body, UseGuards, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlatsService } from './plats.service';
import { CreatePlatDto } from './dto/create-plat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../images/cloudinary.service';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Plats')
@Controller('plats')
export class PlatsController {
    constructor(
        private readonly platsService: PlatsService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

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
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                is_published: { type: 'boolean' },
                is_premium: { type: 'boolean' },
                restaurant_id: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async create(
        @Body() createPlatDto: CreatePlatDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        let imageUrl: string | undefined;
        if (file) {
            const result = await this.cloudinaryService.uploadImage(file);
            imageUrl = result.secure_url;
        }
        return this.platsService.create(createPlatDto, imageUrl);
    }

    @Get('restaurant/:restaurantId')
    async findAll(@Param('restaurantId') restaurantId: string) {
        return this.platsService.findAllByRestaurant(restaurantId);
    }
}
