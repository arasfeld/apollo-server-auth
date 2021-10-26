import { gql } from 'apollo-server-express';

export default gql`
  input LoginInput {
    email: String!
    password: String!
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
  }

  type RegisterPayload {
    user: User!
  }

  type User {
    id: ID!
    email: String!
  }
`;
