import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';

// import navigation hook
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export default function Home() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, socketId, nightMode } = useAppContext();

  
  // if author is empty string, redirect to set-author page, use navigate hook
  let router = useRouter();
  
  
  useEffect(() => {
    
    if (author === '') {
      // use the navigate hook to redirect to set-author page
      router.push('/set-author', undefined, { shallow: true });
    }
  }, [author, router]);
  

  return (
    <main
      className={`${inter.className}`}
    >
      Page Content
    </main>
  );
};
