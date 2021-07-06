import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GetRoomsParamsDecorator } from './decorators/get-rooms-params.decorator';
import {
  CreateRoomBookingDto,
  GetLocationParamsDto,
  GetRoomsParamsDto,
} from './locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handleGetLocations(@Query() params: GetLocationParamsDto) {
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
  ) {
    try {
      const data = await this.locationsService.handleGetRooms(params); // to do

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post(':id/room/:type/booking')
  @HttpCode(HttpStatus.CREATED)
  public async handleCreateRoomBooking(@Body() params: CreateRoomBookingDto) {
    try {
      const data = await this.locationsService.createRoomBooking(params);

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
