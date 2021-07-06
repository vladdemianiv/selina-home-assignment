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
