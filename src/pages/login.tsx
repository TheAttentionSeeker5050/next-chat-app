// import css and fonts
import { Inter } from 'next/font/google';

// import app context
import { useAppContext } from '@/context/MyContext';

// react and next imports
import { useState } from 'react'; // Add the import statement for Dispatch and SetStateAction
import Head from 'next/head';
import { useRouter } from 'next/router';


// import custom components
import SetDummyUsernameForm from '@/components/SetDummyUsernameForm';
import LoginWithCredentialsForm from '@/components/LoginWithCredentialsForm';
import LoginWithOauthForm from '@/components/LoginWithOauthForm';
import HeaderComponent from '@/components/HeaderComponent';


const inter = Inter({ subsets: ['latin'] });


export default function Login() {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, authorId, nightMode, setAuthor, setAuthorId } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);

  // use the navigate hook to redirect to set-author page once author is set
  let router = useRouter();

  return (
    <div className={`${inter.className} ${nightMode === true ? 'dark' : ''} `}>

      <Head>
        <title>Next.js Chat App - Set Author</title>
        <meta name="description" content="Set Author" />
      </Head>

      <div className='w-full  dark:bg-back-secondary-dark bg-back-light '>
        <main
          className={`${inter.className} flex flex-col gap-6 px-4 mx-auto py-6 mobile:w-96 tablet:w-1/3`}
          >
          {/* <h1 className='text-2xl text-center font-bold mb-6 text-blue-balloons-light'>User Authorization</h1> */}
          <HeaderComponent title='User Authorization' transparentBackground={true} />
          {error && <p className="text-red-500">{error}</p>}
          <SetDummyUsernameForm setAuthor={setAuthor} setError={setError} setAuthorId={setAuthorId} router={router} />

          <span className='text-xl font-semibold text-center text-fore-tertiary-light dark:text-fore-tertiary-dark'>Or</span>

          <LoginWithCredentialsForm setErrorMessage={setError} />

          <span className='text-xl font-semibold text-center text-fore-tertiary-light dark:text-fore-tertiary-dark'>Or</span>

          <LoginWithOauthForm/>
          
        </main>
      </div> 
    </div>
  );
};
