import { get } from 'config';

export default {
  DATABASE: get('database.database'),
  TYPE: get('database.type'),
  HOST: get('database.host'),
  PASSWORD: get('database.password'),
  PORT: get('database.port'),
  USERNAME: get('database.username'),
};
