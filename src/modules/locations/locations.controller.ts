import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { IResponse } from 'src/dto';
import { Location } from '../core/database/entities/location.entity';
import {
  CreateRoomBookingDataDecorator,
  GetRoomsParamsDecorator,
} from './decorators/get-rooms-params.decorator';
import {
  CreateRoomBookingDto,
  GetLocationParamsDto,
  GetRoomsParamsDto,
  PopulatedRoomDto,
} from './locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handleGetLocations(
    @Query() params: GetLocationParamsDto,
  ): Promise<IResponse<Location[]>> {
    try {
      const data = await this.locationsService.handleGetLocations(params);

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get(':id/rooms')
  @HttpCode(HttpStatus.OK)
  public async handleGetRooms(
    @GetRoomsParamsDecorator() params: GetRoomsParamsDto,
  ): Promise<IResponse<PopulatedRoomDto[]>> {
    try {
      const data = await this.locationsService.handleGetRooms(params);

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post(':id/room/:type/booking')
  @HttpCode(HttpStatus.CREATED)
  public async handleCreateRoomBooking(
    @CreateRoomBookingDataDecorator() params: CreateRoomBookingDto,
  ): Promise<IResponse<string>> {
    try {
      const data = await this.locationsService.createRoomBooking(params);

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
