import WebSocket from 'ws';
import type { ServerPacket } from './types/packetTypes';

export type ClientState = {
  username: string;
  room: string;
};

export const clients = new Map<WebSocket, ClientState>();

export function send(ws: WebSocket, packet: ServerPacket) {
  ws.send(JSON.stringify(packet));
}

export function broadcastToRoom(room: string, packet: ServerPacket, excludeWs?: WebSocket) {
  for (const [ws, state] of clients.entries()) {
    if (state.room === room && ws !== excludeWs) {
      send(ws, packet);
    }
  }
}

export function getClientState(ws: WebSocket): ClientState | undefined {
  return clients.get(ws);
}

export function requireClientState(ws: WebSocket): ClientState | null {
  const state = getClientState(ws);
  if (!state) {
    console.log("[server] Request from unknown client, rejecting");
    send(ws, { type: "error", message: "You must join a room first" });
    return null;
  }
  return state;
}
