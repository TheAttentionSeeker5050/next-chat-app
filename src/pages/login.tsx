import { Inter } from 'next/font/google';
import { FormEvent, useState } from 'react'; // Add the import statement for Dispatch and SetStateAction

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';
import SetDummyUsernameForm from '@/components/SetDummyUsernameForm';
import Head from 'next/head';
import { useRouter } from 'next/router';

// validate author function
import { validateAuthorName } from '@/utils/validators/validateAuthorName';

// zod error type 
import { ZodError } from 'zod';
import { saveToLocalStorage } from '@/context/localStorageHandlers';
import LoginWithCredentialsForm from '@/components/LoginWithCredentialsForm';
import LoginWithOauthForm from '@/components/LoginWithOauthForm';




export default function SetAuthor() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, authorId, nightMode, setAuthor, setAuthorId } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);

  // use the navigate hook to redirect to set-author page once author is set
  let router = useRouter();

  return (
    <>
      <Head>
        <title>Next.js Chat App - Set Author</title>
        <meta name="description" content="Set Author" />
      </Head>
      <main
        className={`${inter.className} flex flex-col gap-6 px-3 my-6 mx-auto w-full mobile:w-96 tablet:w-1/3 `}
        >
        <h1 className='text-2xl text-center font-bold mb-6 text-blue-balloons-light'>User Authorization</h1>
        {error && <p className="text-red-500">{error}</p>}
        <SetDummyUsernameForm setAuthor={setAuthor} setError={setError} setAuthorId={setAuthorId} router={router} />

        <span className='text-xl font-semibold text-center text-fore-tertiary-light'>Or</span>

        <LoginWithCredentialsForm setErrorMessage={setError} />

        <span className='text-xl font-semibold text-center text-fore-tertiary-light'>Or</span>

        <LoginWithOauthForm/>

        
      </main>
    </>
  );
};
