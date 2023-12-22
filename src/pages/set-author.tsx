import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';
import SetAuthorForm from '@/components/setAuthorForm';


export default function SetAuthor() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, socketId, nightMode } = useAppContext();

  return (
    <main
      className={`${inter.className}`}
    >
      <h1>Set Author</h1>

      <SetAuthorForm />
    </main>
  );
};
