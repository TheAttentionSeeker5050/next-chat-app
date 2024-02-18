import { NextPage } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google';

// import the register form
import RegisterForm from '@/components/RegisterForm';
import { validateEmail } from '@/utils/validators/validateEmail';
import { validatePassword } from '@/utils/validators/validatePassword';
import { useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });


const Register: NextPage = ({}) => {

    // declare the router
    const router = useRouter();

    // the error state
    const [error, setError] = useState<string | null>(null);

    // submit handler
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // set error to null
        setError(null);

        // get the form input values
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // alert('submitting register form... \nemail: ' + email + " \npassword: " + password);

        try {
            // validate email
            const validateEmailResult = validateEmail(email);
            // console.log('validateResult:', validateResult);
            if (!validateEmailResult.success) {
                setError(validateEmailResult.error?.issues[0]?.message || 'Invalid email');
                return;
            }
            // validate password    
            const validatePasswordResult = validatePassword(password);
            if (!validatePasswordResult.success) {
                setError(validatePasswordResult.error?.issues[0]?.message || 'Invalid password');
                return;
            }

            // alert('Valid email and password');
            // attempt to fetch the server POST to /api/auth/register
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // if the response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Could not register');
            }

            // if the response is ok, redirect to the login page
            // use next router to redirect to the login page
            router.push('/login');
            
            // print the data for testing
            const data = await response.json();
            console.log('data:', data);


        } catch (error) {
            setError('Oops! Could not submit your registration form');
        }
        
    }

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
                <RegisterForm submitHandler={submitHandler}/>
                
                {error && <p className="text-red-500">{error}</p>}
            </main>
        </>
    );
}

export default Register