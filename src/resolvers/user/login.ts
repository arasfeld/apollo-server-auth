import { compareSync } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-core';
import { User } from '../../entities';
import { createTokenCookie } from '../../utils/token-handler';
import { Context } from '../../context';

export interface LoginInput {
  password: string;
  username: string;
}

export interface LoginPayload {
  user: User;
}

export const login = async (
  _parent: any,
  { input }: { input: LoginInput },
  { em, res }: Context
): Promise<LoginPayload> => {
  const userRepository = em.getRepository(User);
  const user = await userRepository.findOne({ username: input.username });
  if (!user) {
    throw new AuthenticationError('User does not exist');
  }
  if (!compareSync(input.password, user.passwordHash)) {
    throw new AuthenticationError('Password incorrect');
  }
  createTokenCookie(user, res);
  return { user };
}
