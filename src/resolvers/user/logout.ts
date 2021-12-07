import { clearTokenCookie } from '../../utils/token-handler';
import { Context } from '../../context';

export interface LogoutPayload {
  success: boolean;
}

export const logout = async (
  _parent: any,
  _args: any,
  { res }: Context
): Promise<LogoutPayload> => {
  clearTokenCookie(res);
  return { success: true };
}
