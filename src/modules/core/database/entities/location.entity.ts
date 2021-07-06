import { CreateRoomBookingDto } from 'src/modules/locations/locations.dto';
import {
  Column,
  Entity,
  EntityManager,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Room } from './rooms.entity';

@Entity('locations')
export class Location {
  public static async getAvailableRoomsCount(
    data: CreateRoomBookingDto,
    manager: EntityManager,
  ) {
    const { locationId, roomType, from, to } = data;
    const [{ count: availableCount }] = await manager.query(`
        SELECT public.get_available_rooms_count('${locationId}', '${roomType}', '${from}', '${to}') as count;
      `);

    return availableCount;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @OneToMany(() => Room, (room) => room.location)
  rooms: Room[];

  @OneToMany(() => Room, (booking) => booking.location)
  bookings: Booking[];
}
