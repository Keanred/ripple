import WebSocket from 'ws';
import type { ServerPacket } from './types/packetTypes';

export type ClientState = {
  username: string;
  room: string;
};

export const clients = new Map<WebSocket, ClientState>();
export const rooms = new Map<string, Set<WebSocket>>();

export const send = (ws: WebSocket, packet: ServerPacket): void => {
  ws.send(JSON.stringify(packet));
};

export const broadcastToRoom = (room: string, packet: ServerPacket, excludeWs?: WebSocket): void => {
  const roomClients = rooms.get(room);
  if (!roomClients) return;
  for (const ws of roomClients) {
    if (ws === excludeWs) continue;
    send(ws, packet);
  }
};

export const getClientState = (ws: WebSocket): ClientState | undefined => {
  return clients.get(ws);
};

export const requireClientState = (ws: WebSocket): ClientState | undefined => {
  const state = getClientState(ws);
  if (!state) {
    console.log('[server] Request from unknown client, rejecting');
    send(ws, { type: 'error', message: 'You must join a room first' });
    return undefined;
  }
  return state;
};
