// Broadcast to room when someone sends a message
export type ChatPacket = {
  type: "chat";
  username: string;
  content: string;
  room: string;
  timestamp: number;
};

// Broadcast to room when someone joins or leaves
export type EventPacket = {
  type: "event";
  content: string; // e.g. "Alice joined the room"
  timestamp: number;
};

// Sent to a client if something goes wrong
export type ErrorPacket = {
  type: "error";
  message: string;
};

export type ServerPacket = ChatPacket | EventPacket | ErrorPacket;

// Sent when a user first connects and picks a username + room
export type JoinPacket = {
  type: "join";
  username: string;
  room: string;
};

// Sent when a user sends a chat message
export type MessagePacket = {
  type: "message";
  content: string;
};

// Sent when a user wants to switch rooms
export type SwitchRoomPacket = {
  type: "switch_room";
  room: string;
};

export type ClientPacket = JoinPacket | MessagePacket | SwitchRoomPacket;

