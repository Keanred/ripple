import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ClientPacket } from './types/packetTypes';
import { useChatContext } from './ChatContext';

type LoginProps = {
  connected: boolean;
  send: (packet: ClientPacket) => void;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const Login: React.FC<LoginProps> = ({ connected, send, setLoggedIn }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [roomInput, setRoomInput] = useState('');
  const { setUsername, setRoom } = useChatContext();

  const onLogin = () => {
    if (!connected) {
      if (usernameInput.trim() === '' || roomInput.trim() === '') {
        alert('Please enter both username and room.');
        return;
      }
      setUsername(usernameInput);
      setRoom(roomInput);
      const packet: ClientPacket = {
        type: 'join',
        username: usernameInput,
        room: roomInput,
      };
      send(packet);
      setLoggedIn(true);
    } else {
      alert('Already connected!');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="background.default">
      <Box bgcolor="background.paper" p={4} borderRadius={4} boxShadow={3} maxWidth={400} width="100%">
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
        />
        <TextField
          label="Room"
          variant="outlined"
          fullWidth
          margin="normal"
          value={roomInput}
          onChange={e => setRoomInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};