// MyContext.tsx
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

// Define the context type
interface AppContextType {
  author: string;
  socketId: string;
  nightMode: boolean;
  // Add more statuses here
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [author, setAuthor] = useState<string>('');
  const [socketId, setSocketId] = useState<string>('');
  const [nightMode, setNightMode] = useState<boolean>(false);
  // Add more states as needed

  const contextValue: AppContextType = {
    author,
    socketId,
    nightMode,
    // Add more statuses here
  };

  return (
    <AppContext.Provider value={contextValue as AppContextType}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export { AppContextProvider, useAppContext };
