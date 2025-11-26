import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { PlatsService } from './plats.service';
import { PlatsController } from './plats.controller';
import { ImagesModule } from '../images/images.module';

@Module({
    imports: [ImagesModule],
    controllers: [MenusController, PlatsController],
    providers: [MenusService, PlatsService],
    exports: [MenusService, PlatsService],
})
export class MenusModule { }
