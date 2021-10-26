import type { Context, LogoutPayload } from '../../types';

export const logout = async (
  _parent: any,
  _args: any,
  _context: Context
): Promise<LogoutPayload> => {
  return { success: true };
}
