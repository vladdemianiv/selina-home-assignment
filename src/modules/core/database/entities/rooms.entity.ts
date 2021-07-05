import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoomTypes } from '../../constants';
import { Location } from './location.entity';

@Entity('rooms')
export class Room {
  @Column({
    name: 'location_id',
    type: 'uuid',
    primary: true,
  })
  locationId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    enum: RoomTypes,
    primary: true,
  })
  type: RoomTypes;

  @Column({
    name: 'count',
    type: 'int',
  })
  count: number;

  @ManyToOne(() => Location, (location) => location.rooms)
  @JoinColumn({
    name: 'location_id',
  })
  location: Location;
}
