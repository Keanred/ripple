// Sent when a user first connects and picks a username + room
export type JoinPacket = {
  type: 'join';
  username: string;
  room: string;
};

// Sent when a user sends a chat message
export type MessagePacket = {
  type: 'message';
  content: string;
};

// Sent when a user wants to switch rooms
export type SwitchRoomPacket = {
  type: 'switch_room';
  room: string;
};

export type ClientPacket = JoinPacket | MessagePacket | SwitchRoomPacket;
