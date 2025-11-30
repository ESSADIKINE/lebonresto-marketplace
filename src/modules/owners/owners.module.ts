import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { OwnersRepository } from './owners.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository],
  exports: [OwnersService],
})
export class OwnersModule {}
