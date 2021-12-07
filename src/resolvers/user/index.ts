import { login } from './login';
import { logout } from './logout';
import { profile } from './profile';
import { register } from './register';

export const User = {
  Mutation: {
    login,
    logout,
    register,
  },
  Query: {
    profile,
  },
};
