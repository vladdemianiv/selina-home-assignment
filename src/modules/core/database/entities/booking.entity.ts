import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomTypes } from '../../constants';
import { Location } from './location.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'from',
    type: 'timestamp with time zone',
  })
  from: string;

  @Column({
    name: 'to',
    type: 'timestamp with time zone',
  })
  to: string;

  @Column({
    name: 'location_id',
    type: 'uuid',
  })
  locationId: string;

  @Column({
    name: 'room_type',
    type: 'varchar',
    enum: RoomTypes,
  })
  roomType: RoomTypes;

  @ManyToOne(() => Location, (location) => location.bookings)
  @JoinColumn({
    name: 'location_id',
  })
  location: Location;
}
