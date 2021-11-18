import { genSaltSync, hashSync } from 'bcryptjs';
import type { Context, RegisterInput, RegisterPayload, User } from '../../types';

export const register = async (
  _parent: any,
  { input }: { input: RegisterInput },
  { dbPool }: Context
): Promise<RegisterPayload> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(input.password, salt);
  const result = await dbPool.query(
    `insert into users(username, email, password_hash) values($1, $2, $3)`,
    [input.username, input.email, hashedPassword],
  );
  const user: User = result.rows[0];
  return { user };
}
