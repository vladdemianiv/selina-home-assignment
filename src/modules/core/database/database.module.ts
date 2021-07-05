import { TypeOrmModule } from '@nestjs/typeorm';
import DATABASE_CONFIG from 'src/config/database.config';

export default TypeOrmModule.forRoot({
  type: DATABASE_CONFIG.TYPE,
  host: DATABASE_CONFIG.HOST,
  port: DATABASE_CONFIG.PORT,
  username: DATABASE_CONFIG.PASSWORD,
  password: DATABASE_CONFIG.PASSWORD,
  database: DATABASE_CONFIG.DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});
