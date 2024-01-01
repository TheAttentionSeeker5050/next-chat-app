// MyContext.tsx
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

// Define the context type
interface AppContextType {
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>; // Add the missing setAuthor property
  authorId: string;
  setAuthorId: Dispatch<SetStateAction<string>>;
  nightMode: boolean;
  setNightMode: Dispatch<SetStateAction<boolean>>;
  // Add more statuses here
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Create a provider component
const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [author, setAuthor] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>('');
  const [nightMode, setNightMode] = useState<boolean>(false);
  // Add more states as needed
  
  

  const contextValue: AppContextType = {
    author,
    setAuthor, // Include the setAuthor property
    authorId,
    setAuthorId,
    nightMode,
    setNightMode,
    // Add more statuses here
  };


  return (
    <AppContext.Provider value={contextValue}>
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
