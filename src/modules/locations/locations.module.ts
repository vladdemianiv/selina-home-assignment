import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../core/database/entities/location.entity';
import { Room } from '../core/database/entities/rooms.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Room])],
  exports: [LocationsService],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
