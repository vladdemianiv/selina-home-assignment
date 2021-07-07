import { PagingFiltersDto } from '../../dto';
import { RoomTypes } from '../core/constants';

export class GetLocationParamsDto extends PagingFiltersDto {}

export class GetRoomsParamsDto {
  locationId: string;
  from: string;
  to: string;
}

export class CreateRoomBookingDto {
  from: string;
  to: string;
  locationId: string;
  roomType: RoomTypes;
}

export class RoomDto {
  locationId: string;
  type: RoomTypes;
  count: number;
}
export class PopulatedRoomDto extends RoomDto {
  availableCount: number;
}
