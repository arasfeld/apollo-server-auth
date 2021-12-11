export interface LoginInput {
  password: string;
  username: string;
}

export interface LoginPayload {
  user: User;
}

export interface LogoutPayload {
  success: boolean;
}

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface RegisterPayload {
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}
