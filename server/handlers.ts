import WebSocket from 'ws';
import { broadcastToRoom, clients, getClientState, requireClientState, rooms } from './clients';
import { saveMessage } from './db';
import { sendHistory } from './history';

export const handleJoin = (ws: WebSocket, username: string, room: string): void => {
  clients.set(ws, { username, room });
  if (!rooms.has(room)) {
    rooms.set(room, new Set());
  }
  rooms.get(room)!.add(ws);
  sendHistory(ws, room);
  console.log(`[server] ${username} joined room '${room}'`);
  broadcastToRoom(
    room,
    {
      type: 'event',
      content: `${username} joined the room`,
      timestamp: Date.now(),
    },
    ws,
  );
};

export const handleMessage = (ws: WebSocket, content: string): void => {
  const state = requireClientState(ws);
  if (!state) return;

  console.log(`[server] ${state.username} in '${state.room}': ${content}`);
  saveMessage(state.room, state.username, content);
  broadcastToRoom(state.room, {
    type: 'chat',
    username: state.username,
    content,
    room: state.room,
    timestamp: Date.now(),
  });
};

export const handleSwitchRoom = (ws: WebSocket, newRoom: string): void => {
  const state = requireClientState(ws);
  if (!state) return;

  const oldRoom = state.room;
  clients.set(ws, { ...state, room: '' });
  rooms.get(oldRoom)?.delete(ws);
  broadcastToRoom(
    oldRoom,
    {
      type: 'event',
      content: `${state.username} left the room`,
      timestamp: Date.now(),
    },
    ws,
  );

  clients.set(ws, { ...state, room: newRoom });
  if (!rooms.has(newRoom)) {
    rooms.set(newRoom, new Set());
  }
  rooms.get(newRoom)!.add(ws);
  sendHistory(ws, newRoom);
  console.log(`[server] ${state.username} switched from '${oldRoom}' to '${newRoom}'`);
  broadcastToRoom(
    newRoom,
    {
      type: 'event',
      content: `${state.username} joined the room`,
      timestamp: Date.now(),
    },
    ws,
  );
};

export const handleDisconnect = (ws: WebSocket): void => {
  const state = getClientState(ws);
  console.log(`[server] Client disconnected${state ? ` (${state.username} in '${state.room}')` : ''}`);
  if (state) {
    rooms.get(state.room)?.delete(ws);
    broadcastToRoom(
      state.room,
      {
        type: 'event',
        content: `${state.username} left the room`,
        timestamp: Date.now(),
      },
      ws,
    );
    clients.delete(ws);
  }
};
