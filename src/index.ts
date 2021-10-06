import express from 'express';
import http from 'http';

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});
