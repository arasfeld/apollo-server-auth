import { Pool } from 'pg';

const pool = new Pool({
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  user: process.env.POSTGRES_USER,
});

export * from './types';

export default pool;
