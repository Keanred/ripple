import { Login } from './Login';
import { Chat } from './Chat';

import React from 'react';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const onLogin = () => {
    setLoggedIn(true);
  };
  return (
    <>
      <section className="mx-auto flex items-center justify-center flex-col gap-6">
        {loggedIn ? <Chat/> : <Login onLogin={onLogin} />}
      </section>
    </>
  );
}

export default App
