import { MigrationInterface, QueryRunner } from 'typeorm';

export class roomsData1625495592566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const locationsIds = (
      await queryRunner.query(`SELECT id FROM locations`)
    ).map(({ id }) => id);
    for (const locationId of locationsIds) {
      await queryRunner.query(` INSERT INTO rooms (location_id, type, count)
        VALUES 
        ('${locationId}', 'deluxe', 10),
        ('${locationId}', 'dorm', 10),
        ('${locationId}', 'private', 10)
        `);
    }
    console.log(locationsIds);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM rooms;
    `);
  }
}
