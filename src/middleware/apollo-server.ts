import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express';
import resolver from '../graphql/resolver';
import typeDefs from '../graphql/schema';

export default async (app: Express) => {
  const httpServer = app.get('httpServer'); // TODO: move this into a function or enum
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [resolver],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
