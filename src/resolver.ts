import { AuthenticationError } from 'apollo-server-core';
import type { Context, LoginInput, LoginPayload, LogoutPayload, RegisterInput, RegisterPayload, User } from './types';
import defaultUsers from './users';

const users = [...defaultUsers];

export default {
  Mutation: {
    login: async (_parent: any, { input }: { input: LoginInput }, _context: Context): Promise<LoginPayload> => {
      const user = users.find(user => user.email === input.email);
      if (!user) {
        throw new AuthenticationError('User does not exist');
      }
      // TODO: should hash password input and compare hashed values
      if (user.password !== input.password) {
        throw new AuthenticationError('Password incorrect');
      }
      return { user };
    },
    logout: async (_parent: any, _args: any, _context: Context): Promise<LogoutPayload> => {
      return { success: true };
    },
    register: async (_parent: any, { input }: { input: RegisterInput }, _context: Context): Promise<RegisterPayload> => {
      const existingUser = users.find(user => user.email === input.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user: User = {
        id: `${users.length + 1}`,
        email: input.email,
        password: input.password,
      };
      users.push(user);
      return { user };
    }
  },
  Query: {
    profile: async (_parent: any, _args: any, _context: Context): Promise<User> => {
      return {
        id: 'test-id',
        email: 'test@test.com'
      };
    }
  },
};
