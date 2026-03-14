import { WebSocket } from "ws";
import { getRecentMessages } from "./db";

export const sendHistory = (ws: WebSocket, room: string) => {
  const messages = getRecentMessages(room);
  for (const message of messages) {
    ws.send(JSON.stringify(message));
  }
};
