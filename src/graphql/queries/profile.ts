import type { Context, User } from '../../types';

export const profile = async (
  _parent: any,
  _args: any,
  _context: Context
): Promise<User> => {
  return {
    id: 'test-id',
    email: 'test@test.com',
    username: 'test',
    passwordHash: '',
  };
}
