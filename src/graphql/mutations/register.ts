import { genSaltSync, hashSync } from 'bcryptjs';
import type { Context, RegisterInput, RegisterPayload, User } from '../types';

export const register = async (
  _parent: any,
  { input }: { input: RegisterInput },
  { dataSources }: Context
): Promise<RegisterPayload> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(input.password, salt);
  const user = await dataSources.users.create({
    username: input.username,
    email: input.email,
    passwordHash: hashedPassword,
  });
  return { user };
}
