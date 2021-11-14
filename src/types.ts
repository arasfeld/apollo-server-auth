import type { Request, Response } from 'express';
import type { Pool } from 'pg';

export interface Context {
  dbPool: Pool;
  req: Request;
  res: Response;
  user?: User;
}

export interface LoginInput {
  password: string;
  username: string;
}

export interface LoginPayload {
  user: User;
}

export interface LogoutPayload {
  success: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface RegisterPayload {
  user: User;
}
