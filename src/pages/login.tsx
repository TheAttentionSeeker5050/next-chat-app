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




export default function SetAuthor() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, authorId, nightMode, setAuthor, setAuthorId } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);

  // use the navigate hook to redirect to set-author page once author is set
  let router = useRouter();
  
  // do some onSubmit function to set the author, use form handler as event param
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const newAuthor = formData.get('author') as string;

      const validateResult = validateAuthorName(newAuthor) as { success: boolean; error?: ZodError<string>; data?: any };

      // use the validate author function to check if author is valid
      if (!validateResult.success) {
        setError(validateResult.error?.issues[0].message || 'Invalid author name');
        return;
      }

      // make a call to the server to set the author
      const res = await fetch('/api/auth/set-dummy-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // only the username is needed
          username: newAuthor,
        }),
      });


      // check if response is ok
      if (!res.ok) {
        setError('Oops! Something went wrong while setting the author');
        return;
      }

      // if response json contains user
      const user = await res.json() as { _id: string; username: string; };

      if (!user) {
        setError('Could not set the author');
        return;
      }

      // set app context author
      setAuthor(user.username);
      setAuthorId(user._id);

      // use the localstorage to set the author using our methods inside context dir
      saveToLocalStorage('author', user.username);
      saveToLocalStorage('authorId', user._id);

      // use the navigate hook to redirect to set-author page
      await router.push('/', undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>Next.js Chat App - Set Author</title>
        <meta name="description" content="Set Author" />
      </Head>
      <main
        className={`${inter.className} flex flex-col gap-8 px-3 my-10 mx-auto w-full mobile:w-96 tablet:w-1/3 `}
        >
        <h1 className='text-3xl text-center font-bold mb-6'>User Authorization</h1>
        {error && <p className="text-red-500">{error}</p>}
        <SetDummyUsernameForm author={author} setAuthor={setAuthor} submitHandler={submitHandler}/> 

        <span className='text-xl font-semibold text-center'>Or</span>

        <LoginWithCredentialsForm setErrorMessage={setError} />

        
      </main>
    </>
  );
};
