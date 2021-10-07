export interface Context {
  user?: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginPayload {
  user: User;
}

export interface LogoutPayload {
  success: boolean;
}

export interface User {
  id: string;
  email: string;
  password?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface RegisterPayload {
  user: User;
}
