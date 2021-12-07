import type { Express } from 'express';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from '../orm.config';

export default async (app: Express) => {
  const orm = await MikroORM.init(ormConfig);
  app.set('entityManager', orm.em.fork());
};
