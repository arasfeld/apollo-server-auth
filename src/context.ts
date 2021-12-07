import type { Request, Response } from 'express';
import type { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { User } from './entities'; 

export interface Context {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  user?: User;
}
