import { FormEventHandler } from "react";

interface LoginWithCredentialsFormProps {
    // submitHandler: FormEventHandler<HTMLFormElement>;
    setErrorMessage: (message: string) => void;
}

const LoginWithCredentialsForm: React.FC<LoginWithCredentialsFormProps> = ({ setErrorMessage }) => {
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('logging in with credentials');
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-6 dark:text-fore-secondary-dark ">
            <h2 className='text-xl font-semibold text-center'>Login with Credentials</h2>

            <p className="text-center">Enter your username and password to login</p>

            <input type="text" name="username" id="username" placeholder="Enter username" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" max={30} />
            <input type="password" name="password" id="password" placeholder="Enter password" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" max={30} />

            <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Login with Credentials</button>

        </form>
    );
}

export default LoginWithCredentialsForm;