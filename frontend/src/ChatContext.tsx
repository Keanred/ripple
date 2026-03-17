import { createContext, useContext, useState, type ReactNode } from 'react';

interface ChatContextProps {
  username: string;
  setUsername: (name: string) => void;
  room: string;
  setRoom: (room: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return <ChatContext.Provider value={{ username, setUsername, room, setRoom }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
