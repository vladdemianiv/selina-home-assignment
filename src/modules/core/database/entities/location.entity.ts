import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { Room } from './rooms.entity';

@Entity('locations')
export class Location {
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
