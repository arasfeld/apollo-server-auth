import { compareSync } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-core';
import { createTokenCookie } from '../../token';
import type { Context, LoginInput, LoginPayload } from '../types';

export const login = async (
  _parent: any,
  { input }: { input: LoginInput },
  { dataSources, res }: Context
): Promise<LoginPayload> => {
  const user = await dataSources.users.getByUsername(input.username);
  if (!user) {
    throw new AuthenticationError('User does not exist');
  }
  if (!compareSync(input.password, user.passwordHash)) {
    throw new AuthenticationError('Password incorrect');
  }
  createTokenCookie(user, res);
  return { user };
}
