import { AuthenticationError } from 'apollo-server-core';
import type { Context, LoginInput, LoginPayload } from '../../types';
import users from '../../users';

export const login = async (
  _parent: any,
  { input }: { input: LoginInput },
  _context: Context
): Promise<LoginPayload> => {
  const user = users.find(user => user.email === input.email);
  if (!user) {
    throw new AuthenticationError('User does not exist');
  }
  // TODO: should hash password input and compare hashed values
  if (user.password !== input.password) {
    throw new AuthenticationError('Password incorrect');
  }
  return { user };
}
