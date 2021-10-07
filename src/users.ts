import type { User } from './types';

// TODO: this stuff should come from a database
const users: User[] = [
  {
    id: '1',
    email: 'arasfeld@gmail.com',
    password: 'test123'
  },
  {
    id: '2',
    email: 'makemeapielee@gmail.com',
    password: 'pass456'
  }
];

export default users;
