
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type LoginProps = {
  onLogin: () => void;
};

export const Login: React.FC<LoginProps> = (props) => {
  const { onLogin } = props;
  const [username, setUsername] = React.useState('');
  const [room, setRoom] = React.useState('');

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
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Room"
          variant="outlined"
          fullWidth
          margin="normal"
          value={room}
          onChange={e => setRoom(e.target.value)}
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
