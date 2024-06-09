import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  url:
    process.env.DATABASE_URL ||
    'postgresql://questionpro_owner:kphJtyqG5O3N@ep-damp-voice-a13y5s22.ap-southeast-1.aws.neon.tech/questionpro?sslmode=require',
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  // synchronize: true, // for development
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
