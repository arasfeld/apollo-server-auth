import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express';
import { Context } from '../context';
import resolvers from '../resolvers';
import typeDefs from '../schema';
import { getUserFromTokenCookie } from '../utils/token-handler';

export default async (app: Express) => {
  const httpServer = app.get('httpServer'); // TODO: move this into a function or enum
  const entityManager = app.get('entityManager'); // TODO: move this into a function or enum
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }): Context => ({
      em: entityManager,
      req,
      res,
      user: getUserFromTokenCookie(req),
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
