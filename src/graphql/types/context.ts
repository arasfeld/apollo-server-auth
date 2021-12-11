import type { Request, Response } from 'express';
import { UsersDataSource } from './../data-sources';
import type { User } from './user';

export interface Context {
  dataSources: {
    users: UsersDataSource<Context>
  },
  req: Request;
  res: Response;
  user?: User;
}
