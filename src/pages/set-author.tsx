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
      className={`${inter.className} flex flex-col justify-center gap-8 items-center mt-24`}
    >
      <h1 className='text-2xl'>Set Author Name</h1>

      <SetAuthorForm />
    </main>
  );
};
