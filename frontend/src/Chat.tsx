import { Button, Input, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useChatContext } from './ChatContext';
import type { ClientPacket, ServerPacket } from './types/packetTypes';

type ChatProps = {
  messages: ServerPacket[];
  send: (packet: ClientPacket) => void;
  clearMessages: () => void;
  connected: boolean;
};

export const Chat: React.FC<ChatProps> = ({ messages, send, clearMessages, connected }) => {
  const [input, setInput] = useState('');
  const { username, room, setRoom } = useChatContext();

  const handleSend = () => {
    if (!username || !room) {
      alert('Username and room are required to send messages.');
      return;
    }
    if (input.startsWith('/')) {
      checkCommand(input);
    } else {
      if (input.trim()) {
        send({
          type: 'message',
          content: input,
        });
      }
    }
    setInput('');
  };

  const checkCommand = (input: string) => {
    const [command, ...args] = input.slice(1).split(' ');
    switch (command) {
      case 'switch':
        clearMessages();
        send({
          type: 'switch_room',
          room: args[0],
        });
        setRoom(args[0]);
        return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const decoratedMessage = (index: number, msg: ServerPacket) => {
    switch (msg.type) {
      case 'error':
        return (
          <Box key={index} fontStyle="italic" color="error.main">
            Error: {msg.message}
          </Box>
        );
      case 'event':
        return (
          <Box key={index} fontStyle="italic" color="text.secondary">
            {msg.content}
          </Box>
        );
      case 'chat':
        return (
          <Box key={index}>
            <strong>{msg.username}</strong>: {msg.content}
          </Box>
        );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Box bgcolor="background.paper" p={4} borderRadius={4} boxShadow={3} maxWidth={1024} width="100%">
        <h1>Chat</h1>
        <div>Room: {room}</div>
        <div>Username: {username}</div>
        <div>Connection: {connected ? 'Connected' : 'Disconnected'}</div>
        <Paper
          variant="outlined"
          sx={{ height: 800, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column-reverse' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flex: 1 }}>
            {[...messages].reverse().map((msg, index) => decoratedMessage(index, msg))}
          </Box>
        </Paper>
        <Box display="flex" gap={1}>
          <Input
            placeholder="Type your message..."
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSend}>Send</Button>
        </Box>
      </Box>
    </Box>
  );
};
