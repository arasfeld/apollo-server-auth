import { clearTokenCookie } from '../../token';
import type { Context, LogoutPayload } from '../../types';

export const logout = async (
  _parent: any,
  _args: any,
  { res }: Context
): Promise<LogoutPayload> => {
  clearTokenCookie(res);
  return { success: true };
}
