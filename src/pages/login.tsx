// next components
import { NextPage } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// react hooks
import { useState } from 'react';
import { useRouter } from 'next/router';

// validators
import { validateEmail } from '@/utils/validators/validateEmail';
import { validatePassword } from '@/utils/validators/validatePassword';


const Login: NextPage = ({}) => {

    // declare the router
    const router = useRouter();

    // the error state
    const [error, setError] = useState<string | null>(null);
    
    
    return (
        <>
            <Head>
                <title>Next.js Chat App - Register</title>
                <meta name="description" content="Set Author" />
            </Head>

            <main
            className={`${inter.className} flex flex-col min-h-screen gap-8 items-center mt-10`}
            >
                <h1 className='text-3xl'>Register</h1>
                
                {error && <p className="text-red-500">{error}</p>}
            </main>
        </>
    );
}

export default Login