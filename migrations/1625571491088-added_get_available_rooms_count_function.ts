import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedGetAvailableRoomsCountFunction1625571491088
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION
        get_available_rooms_count(
          location_id_arg uuid,
          type_arg varchar,
          from_arg timestamp with time zone,
          to_arg timestamp with time zone
        ) returns int
        language plpgsql
        as
        $$
        declare
          available_count integer;
        begin
          SELECT
            (SELECT count FROM rooms WHERE location_id = location_id_arg and type = type_arg) -
            (SELECT COUNT(id) FROM bookings
              WHERE
              location_id = location_id_arg
              AND room_type = type_arg
              AND (
                (from_arg BETWEEN "from" and "to") OR 
                (to_arg BETWEEN "from" and "to") OR 
                ("from" BETWEEN from_arg and to_arg) OR
                ("to" BETWEEN from_arg and to_arg)
              )
            )
          into available_count;
          
          return available_count;
        end;
        $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS get_available_rooms_count;
    `);
  }
}
