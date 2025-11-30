import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusRepository } from './menus.repository';
import { PlatsService } from './plats.service';
import { PlatsController } from './plats.controller';
import { PlatsRepository } from './plats.repository';
import { DatabaseModule } from '../../database/database.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [DatabaseModule, ImagesModule],
  controllers: [MenusController, PlatsController],
  providers: [MenusService, MenusRepository, PlatsService, PlatsRepository],
  exports: [MenusService, PlatsService],
})
export class MenusModule {}
