import WebSocket from 'ws';
import { clients, broadcastToRoom, getClientState, requireClientState } from './clients';
import { sendHistory } from './history';
import { saveMessage } from './db';

export const handleJoin = (ws: WebSocket, username: string, room: string) => {
  clients.set(ws, { username, room });
  sendHistory(ws, room);
  console.log(`[server] ${username} joined room '${room}'`);
  broadcastToRoom(room, {
    type: "event",
    content: `${username} joined the room`,
    timestamp: Date.now()
  }, ws);
};

export const handleMessage = (ws: WebSocket, content: string) => {
  const state = requireClientState(ws);
  if (!state) return;

  console.log(`[server] ${state.username} in '${state.room}': ${content}`);
  saveMessage(state.room, state.username, content);
  broadcastToRoom(state.room, {
    type: "chat",
    username: state.username,
    content,
    room: state.room,
    timestamp: Date.now()
  });
};

export const handleSwitchRoom = (ws: WebSocket, newRoom: string) => {
  const state = requireClientState(ws);
  if (!state) return;

  const oldRoom = state.room;
  clients.set(ws, { ...state, room: "" });
  broadcastToRoom(oldRoom, {
    type: "event",
    content: `${state.username} left the room`,
    timestamp: Date.now()
  }, ws);

  clients.set(ws, { ...state, room: newRoom });
  console.log(`[server] ${state.username} switched from '${oldRoom}' to '${newRoom}'`);
  broadcastToRoom(newRoom, {
    type: "event",
    content: `${state.username} joined the room`,
    timestamp: Date.now()
  }, ws);
};

export const handleDisconnect = (ws: WebSocket) => {
  const state = getClientState(ws);
  console.log(`[server] Client disconnected${state ? ` (${state.username} in '${state.room}')` : ""}`);
  if (state) {
    broadcastToRoom(state.room, {
      type: "event",
      content: `${state.username} left the room`,
      timestamp: Date.now()
    }, ws);
    clients.delete(ws);
  }
};
