import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';

// import navigation hook
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import CurrentUserMessageBubble from '@/components/CurrentUserMessageBubble';
import OtherUserMessageBubble from '@/components/OtherUserMessageBubble';

// import document hook components
import Head from 'next/head';
import NewMessageComponent from '@/components/NewMessageComponent';
import DarkThemeToggleSwitch from '@/components/DarkThemeToggleSwitch';


// import validation function and error type
import { validateText } from '@/utils/validators/validateText';
import { ZodError } from 'zod';

export default function Home() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, setAuthor, authorId, nightMode, setAuthorId } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  
  // if author is empty string, redirect to set-author page, use navigate hook
  let router = useRouter();
  
  
  useEffect(() => {
    
    if (author === '') {
      // lookout on localstorage for author value, using the getFromLocalStorage function
      const authorFromLocalStorage = localStorage.getItem('author');
      const authorIdFromLocalStorage = localStorage.getItem('authorId');
      if (authorFromLocalStorage && authorIdFromLocalStorage) {
        // set the author in the context
        setAuthor(authorFromLocalStorage);
        setAuthorId(authorIdFromLocalStorage);
      } else {
        // use the navigate hook to redirect to set-author page if author is empty
        router.push('/set-author', undefined, { shallow: true });
      }
    }

  }, [author, router]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleAddNewMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set the error to null
    setError(null);

    // get the form data, field name is message
    const formData = new FormData(e.currentTarget);
    const newMessage = formData.get('message') as string;

    // store the validation result in a constant
    const validateResult = validateText(newMessage) as { success: boolean; error?: ZodError<string>; data?: any };

    

    // if any of the validation fails, add the error message to the state variable, which will be displayed in the UI
    if (validateResult.success === false) {
      
      if (validateResult.success === false) {
        // print error message inside zo error if it exists
        if (validateResult.error) {
          setError(validateResult.error.issues[0].message);
        }

        // disapear the error message after 8 seconds
        setTimeout(() => {
          setError(null);
        }, 5*1000);
      }
      return;
    }


  }

  return (
    <>
      <Head>
        <title>Next.js Chat App - Group Conversation</title>
        <meta name="description" content="Group Conversation" />
      </Head>
      <main className={`${inter.className} flex flex-col gap-8`}>
        <nav className="bg-back-secondary-light pt-8 pb-10 flex flex-col gap-4 items-center">
          <h1 className='text-3xl font-semibold '>Group Conversation</h1>
          <DarkThemeToggleSwitch />
        </nav>

        <section className="flex flex-col gap-2 w-full px-6 mb-20">
          <div className="self-end ">
            <CurrentUserMessageBubble />
          </div>
          <div className="self-start ">
            <OtherUserMessageBubble />
          </div>
          <div className="self-end ">
            <CurrentUserMessageBubble />
          </div>
          <div className="self-start ">
            <OtherUserMessageBubble />
          </div>
          <div className="self-end ">
            <CurrentUserMessageBubble />
          </div>
          <div className="self-start ">
            <OtherUserMessageBubble />
          </div>
          
        </section>


        <NewMessageComponent error={error} handleAddNewMessage={handleAddNewMessage} message={message} handleChange={handleChange} />
      </main>
    </>
  );
};
