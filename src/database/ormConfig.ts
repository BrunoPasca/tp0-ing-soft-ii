import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';

dotenvConfig({ path: process.env.ENVFILE || '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // synchronize:
  //   !process.env.DATABASE_SYNCHRONIZE ||
  //   process.env.DATABASE_SYNCHRONIZE === 'true',
  synchronize: true, // TODO: Check this
  //ssl: process.env.DATABASE_SSL === 'true' || false,
  //migrations: ['dist/src/db/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => dataSourceOptions);
export const dataSource = new DataSource(dataSourceOptions);
