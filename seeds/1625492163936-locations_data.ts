import { MigrationInterface, QueryRunner } from 'typeorm';

const locationsNames = [
  'Secret Garden Lisbon',
  'Medellin',
  'Mexico City Downtown',
  'La Fortuna',
  'Manuel Antonio',
  'Pedasi',
  'Milfontes',
  'Oaxaca',
  'Bogota, Chapinero',
  'Ramon by Glow',
  'Palomino',
  'Tulum',
  'Puerto Escondido',
  'Quindio',
  'Bad Gastein',
  'Commodore Astoria',
  'Monteverde',
  'Liverpool',
  'Catahoula New Orleans',
  'London Camden',
  'Birmingham',
  'Mantur Jerusalem',
  'Amazon Tena',
  'Geres',
  'Antigua',
  'NQ1 Manchester',
  'Madalena São Paulo',
  'Granada',
  'Santa Teresa North',
  'Cancun Laguna, Hotel Zone',
];
export class locationsData1625492163936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO locations (id, title) VALUES ${locationsNames
        .map((l) => `(uuid_generate_v4(), '${l}')`)
        .join(',')};
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM locations WHERE title IN (${locationsNames
        .map((l) => `'${l}'`)
        .join(',')});
    `);
  }
}
