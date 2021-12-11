import type { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import type { User } from './graphql/types';

const COOKIE_NAME = 'token';
const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const IS_PROD = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}

export const createTokenCookie = (user: User, res: Response) => {
  const token = sign(user, JWT_SECRET, { expiresIn: '7d' });
  res.cookie(
    COOKIE_NAME,
    token,
    {
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: IS_PROD ? 'none' : 'lax',
      secure: IS_PROD,
    }
  );
};

export const clearTokenCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME);
};

export const getUserFromTokenCookie = (req: Request): User | undefined => {
  try {
    const token: string = req.cookies[COOKIE_NAME];
    return verify(token, JWT_SECRET) as User;
  } catch {
    return undefined;
  }
};
