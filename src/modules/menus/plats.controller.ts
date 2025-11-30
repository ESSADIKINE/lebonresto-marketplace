import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlatsService } from './plats.service';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';

@ApiTags('plats')
@Controller('plats')
export class PlatsController {
  constructor(private readonly platsService: PlatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plat' })
  create(@Body() createPlatDto: CreatePlatDto) {
    return this.platsService.create(createPlatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all plats' })
  findAll() {
    return this.platsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a plat by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.platsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plat' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePlatDto: UpdatePlatDto,
  ) {
    return this.platsService.update(id, updatePlatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plat' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.platsService.remove(id);
  }
}
