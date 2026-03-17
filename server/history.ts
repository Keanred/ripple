import { WebSocket } from 'ws';
import { send } from './clients';
import { getRecentMessages } from './db';
import { ChatPacket } from './types/packetTypes';

export const sendHistory = (ws: WebSocket, room: string) => {
  const messages: ChatPacket[] = getRecentMessages(room);
  for (const message of messages) {
    send(ws, message);
  }
};
