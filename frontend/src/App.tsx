import { Stack } from '@mui/material';
import { useState } from 'react';
import { Chat } from './Chat';
import { ChatProvider } from './ChatContext';
import { useChat } from './hooks/useChat';
import { Login } from './Login';

function App() {
  const { messages, connected, send, clearMessages } = useChat();
  const [hasJoined, setHasJoined] = useState(false);
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
        {hasJoined ? (
          <Chat messages={messages} send={send} clearMessages={clearMessages} connected={connected} />
        ) : (
          <Login socketConnected={connected} send={send} setHasJoined={setHasJoined} />
        )}
      </Stack>
    </ChatProvider>
  );
}

export default App;
