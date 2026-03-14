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
    const parsedMessage: ServerPacket = JSON.parse(message.toString());
    if (parsedMessage.type === 'event') {
      console.log(`Event: ${parsedMessage.content}`);
    }

    console.log(parsedMessage);
    wss.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        ws.send(JSON.stringify(parsedMessage.content));
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
