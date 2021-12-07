import { MikroORM } from '@mikro-orm/core';

export default {
   type: 'postgresql',
   host: process.env.POSTGRES_HOST,
   port: process.env.POSTGRES_PORT,
   dbName: process.env.POSTGRES_DB,
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   entities: ['dist/entities/**/*.js'],
   entitiesTs: ['src/entities/**/*.ts'],
   migrations: {
     path: './src/migrations',
     tableName: 'migrations',
     transactional: true,
   },
} as Parameters<typeof MikroORM.init>[0];
