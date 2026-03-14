import express from 'express';
import { createServer } from 'http';
import Websocket, { WebSocketServer } from 'ws';
import config from '../config';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        ws.send(message.toString());
      }
    });
  });
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

httpServer.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
