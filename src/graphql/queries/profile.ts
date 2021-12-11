import type { Context, User } from '../types';

export const profile = async (
  _parent: any,
  _args: any,
  { user }: Context
): Promise<User> => {
  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
}
