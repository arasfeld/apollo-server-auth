import 'dotenv/config';
import express from 'express';
import http from 'http';
import * as middleware from './middleware';

const port = process.env.PORT || 4000;

async function start() {
  const app = express();

  const httpServer = http.createServer(app);
  app.set('httpServer', httpServer); // TODO: move this to a function or enum

  await middleware.installApolloServer(app);

  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

start();
