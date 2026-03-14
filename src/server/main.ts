import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import config from '../config';
import type { ClientPacket } from './types/packetTypes';
import { handleJoin, handleMessage, handleSwitchRoom, handleDisconnect } from './handlers';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  console.log("[server] New client connected");

  ws.on("message", (data) => {
    const packet: ClientPacket = JSON.parse(data.toString());
    console.log("[server] Received packet:", packet);

    switch (packet.type) {
      case "join":
        handleJoin(ws, packet.username, packet.room);
        break;
      case "message":
        handleMessage(ws, packet.content);
        break;
      case "switch_room":
        handleSwitchRoom(ws, packet.room);
        break;
    }
  });

  ws.on("close", () => handleDisconnect(ws));
});

httpServer.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
