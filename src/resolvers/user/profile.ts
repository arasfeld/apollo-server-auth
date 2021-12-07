import { Context } from '../../context';
import { User } from '../../entities';

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
