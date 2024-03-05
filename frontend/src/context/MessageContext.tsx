// MessageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type MessageType = {
  text: string;
  type: "info" | "success" | "error" | "warning" | "loading";
};

type MessageContextType = {
  message: MessageType | null;
  showMessage: (text: string, type: MessageType["type"]) => void;
  hideMessage: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

type MessageProviderProps = {
  children: ReactNode;
};

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<MessageType | null>(null);

  const showMessage = (text: string, type: MessageType["type"]) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const hideMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
