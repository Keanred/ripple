import { Login } from './Login';
import { Chat } from './Chat';
import { useChat } from './hooks/useChat';
import { useState } from 'react';
import { ChatProvider } from './ChatContext';

function App() {
  const { messages, connected, send, clearMessages } = useChat();
  const [loggedIn, setLoggedIn] = useState(connected);
  return (
    <ChatProvider>
      <section className="mx-auto flex items-center justify-center flex-col gap-6">
        {loggedIn ? (
          <Chat messages={messages} send={send} clearMessages={clearMessages} />
        ) : (
          <Login connected={loggedIn} send={send} setLoggedIn={setLoggedIn} />
        )}
      </section>
    </ChatProvider>
  );
}

export default App;