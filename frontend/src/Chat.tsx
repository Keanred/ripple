import { Input, Paper } from "@mui/material";
import { Box } from "@mui/system";
import type { ChatPacket, ClientPacket } from "./types/packetTypes";
import React, { useState } from "react";
import { useChatContext } from "./ChatContext";

type ChatProps = {  
  messages: ChatPacket[];
  send: (packet: ClientPacket) => void;
};

export const Chat: React.FC<ChatProps> = ({ messages, send }) => {
  const [input, setInput] = useState("");
  const { username, room } = useChatContext();

  const handleSend = () => {
    if (!username || !room) {
      alert("Username and room are required to send messages.");
      return;
    }
    if (input.trim()) {
      send({
        type: "message",
        content: input,
      });
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="background.default">
      <Box bgcolor="background.paper" p={4} borderRadius={4} boxShadow={3} maxWidth={1024} width="100%">
        <h1>Chat Component</h1>
        <div>Room: {room}</div>
        <div>Username: {username}</div>
        <Paper variant="outlined" sx={{ height: 800, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column-reverse' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flex: 1 }}>
            {messages.map((msg, index) => (
              <Box key={index} p={2} borderBottom="1px solid #eee">
                <strong>{msg.username}</strong>: {msg.content}
              </Box>
            ))}
          </Box>
        </Paper>
        <Box display="flex" gap={1}>
          <Input
            placeholder="Type your message..."
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Send</button>
        </Box>
      </Box>
    </Box>
  );
}