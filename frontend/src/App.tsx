import { Stack } from '@mui/material';
import { useState } from 'react';
import { Chat } from './Chat';
import { ChatProvider } from './ChatContext';
import { useChat } from './hooks/useChat';
import { Login } from './Login';

function App() {
  const { messages, connected, send, clearMessages } = useChat();
  const [loggedIn, setLoggedIn] = useState(connected);
  return (
    <ChatProvider>
      <Stack
        component="section"
        sx={{
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 3,
          minHeight: '100vh',
        }}
      >
        {loggedIn ? (
          <Chat messages={messages} send={send} clearMessages={clearMessages} />
        ) : (
          <Login connected={loggedIn} send={send} setLoggedIn={setLoggedIn} />
        )}
      </Stack>
    </ChatProvider>
  );
}

export default App;
