import { compareSync } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-core';
import type { Context, LoginInput, LoginPayload, User } from '../../types';

export const login = async (
  _parent: any,
  { input }: { input: LoginInput },
  ctx: Context
): Promise<LoginPayload> => {
  const result = await ctx.dbPool.query<User>(
    `select * from users where username = $1`,
    [input.username]
  );
  const user = result.rowCount > 0 ? result.rows[0] : undefined;
  if (!user) {
    throw new AuthenticationError('User does not exist');
  }
  if (!compareSync(input.password, user.passwordHash)) {
    throw new AuthenticationError('Password incorrect');
  }
  return { user };
}
