import Database from 'better-sqlite3';
import { ChatPacket } from './types/packetTypes';

const db = new Database('chat.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT NOT NULL,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT INTO messages (room, username, content, timestamp)
  VALUES (@room, @username, @content, @timestamp)
`);

const getHistory = db.prepare(`
  SELECT room, username, content, timestamp
  FROM messages
  WHERE room = ?
  ORDER BY timestamp ASC
  LIMIT 100
`);

export const saveMessage = (room: string, username: string, content: string): void => {
  insert.run({ room, username, content, timestamp: Date.now() });
};

export const getRecentMessages = (room: string): ChatPacket[] => {
  const rows = getHistory.all(room) as Omit<ChatPacket, 'type'>[];
  return rows.map((row) => ({
    type: 'chat',
    ...row,
  }));
};
