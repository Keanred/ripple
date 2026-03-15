import { Login } from './Login';
import { Chat } from './Chat';
import { useChat } from './hooks/useChat';
import React, { useState } from 'react';
import { ChatProvider } from './ChatContext';

function App() {
  let { messages, connected, send } = useChat();
  const [loggedIn, setLoggedIn] = useState(connected);
  // username and room now managed by context
  return (
    <ChatProvider>
      <section className="mx-auto flex items-center justify-center flex-col gap-6">
        {loggedIn ? (
          <Chat messages={messages} send={send} />
        ) : (
          <Login connected={loggedIn} send={send} setLoggedIn={setLoggedIn} />
        )}
      </section>
    </ChatProvider>
  );
}

export default App;