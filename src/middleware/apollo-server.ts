import { UsersDataSource } from './../graphql/data-sources/users';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express';
import { resolver, typeDefs } from '../graphql';
import { getUserFromTokenCookie } from '../token';

export default async (app: Express) => {
  const httpServer = app.get('httpServer'); // TODO: move this into a function or enum
  const pgPool = app.get('pgPool'); // TODO: move this into a function or enum
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [resolver],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({
      req,
      res,
      user: getUserFromTokenCookie(req),
    }),
    dataSources: () => ({
      users: new UsersDataSource(pgPool),
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
