import { Inter } from 'next/font/google';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'; // Add the import statement for Dispatch and SetStateAction

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';
import SetAuthorForm from '@/components/SetAuthorForm';
import Head from 'next/head';
import { useRouter } from 'next/router';

// validate author function
import { validateAuthorName } from '@/utils/validators/validateAuthorName';

// zod error type 
import { ZodError } from 'zod';




export default function SetAuthor() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, socketId, nightMode, setAuthor } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);

  // use the navigate hook to redirect to set-author page once author is set
  let router = useRouter();
  
  // do some onSubmit function to set the author, use form handler as event param
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const newAuthor = formData.get('author') as string;

      if (!newAuthor.trim()) {
          alert('Author name cannot be empty');
          return;
      }

      const validateResult = validateAuthorName(newAuthor);

      // use the validate author function to check if author is valid
      if (validateResult.success === false) {
        // alert print message inside the validateAuthorName function zod error, optional error zod error, optional data string
        const validationResult = validateAuthorName(newAuthor) as { success: boolean; error?: ZodError<string>; data?: any };
        
        if (validationResult.success === false) {
          // print error message inside zo error if it exists
          if (validationResult.error) {
            setError(validationResult.error.issues[0].message);
          }
        }
        return;
      }

      setAuthor(newAuthor);

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
        className={`${inter.className} flex flex-col justify-center gap-8 items-center mt-10`}
        >
        <h1 className='text-2xl'>Set Author Name</h1>
        <SetAuthorForm author={author} setAuthor={setAuthor} submitHandler={submitHandler}/> 

        {error && <p className="text-red-500">{error}</p>}
      </main>
    </>
  );
};
