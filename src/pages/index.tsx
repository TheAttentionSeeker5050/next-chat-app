import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';

// import navigation hook
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CurrentUserMessageBubble from '@/components/CurrentUserMessageBubble';
import OtherUserMessageBubble from '@/components/OtherUserMessageBubble';

// import document hook components
import Head from 'next/head';


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
    <>
      <Head>
        <title>Next.js Chat App - Group Conversation</title>
        <meta name="description" content="Group Conversation" />
      </Head>
      <main className={`${inter.className} flex flex-col gap-8 mt-24`}>
        <h1 className='text-2xl font-semibold text-center'>Group Conversation</h1>

        <section className="flex flex-col w-full px-6">
          <div className="self-end ">
            <CurrentUserMessageBubble />
          </div>
          <div className="self-start ">
            <OtherUserMessageBubble />
          </div>
        </section>
      </main>
    </>
  );
};
