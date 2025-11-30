import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.menusService.remove(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a menu PDF file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'restaurant_id', 'title'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF file to upload',
        },
        restaurant_id: {
          type: 'string',
          description: 'Restaurant ID',
        },
        title: {
          type: 'string',
          description: 'Menu title',
        },
        description: {
          type: 'string',
          description: 'Menu description (optional)',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMenu(
    @UploadedFile() file: Express.Multer.File,
    @Body('restaurant_id') restaurantId: string,
    @Body('title') title: string,
    @Body('description') description?: string,
  ) {
    return this.menusService.uploadMenuPdf(
      file,
      restaurantId,
      title,
      description,
    );
  }
}
