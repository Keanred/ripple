// Sent when a user first connects and picks a username + room
type JoinPacket = {
  type: "join";
  username: string;
  room: string;
};

// Sent when a user sends a chat message
type MessagePacket = {
  type: "message";
  content: string;
};

// Sent when a user wants to switch rooms
type SwitchRoomPacket = {
  type: "switch_room";
  room: string;
};

type ClientPacket = JoinPacket | MessagePacket | SwitchRoomPacket;
