import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { DatabaseModule } from '../../database/database.module';
import { GoogleDriveModule } from '../../google-drive/google-drive.module';

@Module({
    imports: [DatabaseModule, GoogleDriveModule],
    controllers: [RestaurantsController],
    providers: [RestaurantsService, RestaurantsRepository],
    exports: [RestaurantsService],
})
export class RestaurantsModule { }

