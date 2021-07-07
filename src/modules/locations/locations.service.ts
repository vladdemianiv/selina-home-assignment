import { BadRequestException, Injectable } from '@nestjs/common';
import { transformPagingFiltersToOrm } from '../../helpers/paging.helper';
import { Connection, Repository } from 'typeorm';
import { Location } from '../core/database/entities/location.entity';
import {
  CreateRoomBookingDto,
  GetLocationParamsDto,
  GetRoomsParamsDto,
  PopulatedRoomDto,
} from './locations.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../core/database/entities/booking.entity';
import { Room } from '../core/database/entities/rooms.entity';
import {
  BOOKING_CREATED_SUCCESS,
  ROOM_NOT_AVAILABLE_ERROR_MESSAGE,
} from './locations.constants';
import { IResponse } from 'src/dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly connection: Connection,
  ) {}

  public async handleGetLocations(
    params: GetLocationParamsDto,
  ): Promise<IResponse<Location[]>> {
    const [data, count] = await this.locationsRepository.findAndCount(
      transformPagingFiltersToOrm(params),
    );

    return {
      data,
      meta: { count },
    };
  }

  public async createRoomBooking(
    data: CreateRoomBookingDto,
  ): Promise<IResponse<string>> {
    try {
      await this.performBookingTransaction(data);

      return {
        data: BOOKING_CREATED_SUCCESS,
      };
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  private performBookingTransaction(data: CreateRoomBookingDto): Promise<void> {
    return this.connection.transaction(async (manager) => {
      try {
        const availableCount = await Location.getAvailableRoomsCount(
          data,
          manager,
        );
        console.log(availableCount);
        if (availableCount < 1) {
          throw new Error(ROOM_NOT_AVAILABLE_ERROR_MESSAGE);
        }
        const bookingsRepository = manager.getRepository<Booking>(Booking);
        await bookingsRepository.insert(data);
      } catch ({ message }) {
        throw new BadRequestException(message);
      }
    });
  }

  public async handleGetRooms(
    params: GetRoomsParamsDto,
  ): Promise<IResponse<PopulatedRoomDto[]>> {
    const { locationId, from, to } = params;
    const rooms = await this.roomsRepository.find({ where: { locationId } });
    const populatedData = await this.populateRoomsWithAvailableCount(
      rooms,
      from,
      to,
    );
    return {
      data: populatedData,
    };
  }

  private async populateRoomsWithAvailableCount(
    rooms: Room[],
    from: string,
    to: string,
  ): Promise<PopulatedRoomDto[]> {
    const promises = rooms.map(async (room) => {
      const availableCount = await Location.getAvailableRoomsCount(
        {
          locationId: room.locationId,
          roomType: room.type,
          from,
          to,
        },
        this.connection.manager,
      );

      return {
        ...room,
        availableCount,
      };
    });

    return Promise.all(promises);
  }
}
