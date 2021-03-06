import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
    username: String!
  }

  type LoginPayload {
    user: User!
  }

  type LogoutPayload {
    success: Boolean
  }

  type Mutation {
    login(input: LoginInput!): LoginPayload
    logout: LogoutPayload
    register(input: RegisterInput!): RegisterPayload
  }

  type Query {
    profile: User
  }

  input RegisterInput {
    email: String!
    password: String!
    username: String!
  }

  type RegisterPayload {
    user: User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
  }
`;
