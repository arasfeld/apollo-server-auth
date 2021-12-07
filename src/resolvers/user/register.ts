import { genSaltSync, hashSync } from 'bcryptjs';
import { User } from '../../entities';
import { Context } from '../../context';

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface RegisterPayload {
  success: boolean;
}

export const register = async (
  _parent: any,
  { input }: { input: RegisterInput },
  { em }: Context
): Promise<RegisterPayload> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(input.password, salt);
  const userRepository = em.getRepository(User);
  await userRepository.persistAndFlush({
    username: input.username,
    email: input.email,
    passwordHash: hashedPassword,
  });
  return { success: true };
}
