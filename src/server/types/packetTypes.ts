// Broadcast to room when someone sends a message
type ChatPacket = {
  type: "chat";
  username: string;
  content: string;
  room: string;
  timestamp: number;
};

// Broadcast to room when someone joins or leaves
type EventPacket = {
  type: "event";
  content: string; // e.g. "Alice joined the room"
  timestamp: number;
};

// Sent to a client if something goes wrong
type ErrorPacket = {
  type: "error";
  message: string;
};

type ServerPacket = ChatPacket | EventPacket | ErrorPacket;
