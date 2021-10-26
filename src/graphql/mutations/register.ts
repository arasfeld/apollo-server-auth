import type { Context, RegisterInput, RegisterPayload, User } from '../../types';
import users from '../../users';

export const register = async (
  _parent: any,
  { input }: { input: RegisterInput },
  _context: Context
): Promise<RegisterPayload> => {
  const existingUser = users.find(user => user.email === input.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const user: User = {
    id: `${users.length + 1}`,
    email: input.email,
    password: input.password,
  };
  return { user };
}