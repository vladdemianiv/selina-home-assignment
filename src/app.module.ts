import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from './modules/core/database/database.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [DatabaseModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
