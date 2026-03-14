import express from 'express';
import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import config from '../config';
import type { ClientPacket } from './types/packetTypes';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });


type ClientState = {
  username: string;
  room: string;
};

const clients = new Map<WebSocket, ClientState>();

// on MessagePacket
const state = clients.get(ws);
// state.username is available here

wss.on("connection", (ws) => {
  // client just connected, not in a room yet

  ws.on("message", (data) => {
    const packet: ClientPacket = JSON.parse(data.toString());

    switch (packet.type) {
      case "join":
        clients.set(ws, { username: packet.username, room: packet.room });
        //joinRoom(ws, packet.room);
        break;

      case "message":
        const state = clients.get(ws);
        if (!state) {
          send(ws, { type: "error", message: "You must join a room first" });
          return;
        }
        broadcastToRoom(state.room, {
          type: "chat",
          username: state.username,
          content: packet.content,
          room: state.room,
          timestamp: Date.now()
        }, ws);
        break;

      case "switch_room":
        // handle room switch
        break;
    }
  });

  ws.on("close", () => {
    const state = clients.get(ws);
    if (state) {
      leaveRoom(ws, state.room);
      clients.delete(ws);
    }
  });
});
httpServer.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
