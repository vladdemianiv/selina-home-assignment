import { get } from 'config';

module.exports = [
  {
    name: 'default',
    database: get('database.database'),
    type: get('database.type'),
    host: get('database.host'),
    password: get('database.password'),
    port: get('database.port'),
    username: get('database.username'),
    synchronize: false,
    logging: true,
    options: {
      encrypt: true,
    },
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations',
    },
  },
  {
    name: 'seed',
    database: get('database.database'),
    type: get('database.type'),
    host: get('database.host'),
    password: get('database.password'),
    port: get('database.port'),
    username: get('database.username'),
    synchronize: false,
    logging: false,
    options: {
      encrypt: true,
    },
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['seeds/*.ts'],
    cli: {
      migrationsDir: 'seeds',
    },
  },
];
