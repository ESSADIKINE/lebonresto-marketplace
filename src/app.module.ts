import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OwnersModule } from './modules/owners/owners.module';
import { AdminsModule } from './modules/admins/admins.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ImagesModule } from './modules/images/images.module';
import { MenusModule } from './modules/menus/menus.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { EventsModule } from './modules/events/events.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import configuration from './common/config/configuration';
import { validationSchema } from './common/config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    AuthModule,
    CustomersModule,
    OwnersModule,
    AdminsModule,
    RestaurantsModule,
    ImagesModule,
    MenusModule,
    ReservationsModule,
    FeedbackModule,
    EventsModule,
    NotificationsModule,
    CitiesModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
