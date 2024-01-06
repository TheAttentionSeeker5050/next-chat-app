import { FormEventHandler } from "react";
import React from "react";


interface SetDummyUsernameFormProps {
    author: string;
    setAuthor: (newAuthor: string) => void;
    submitHandler: FormEventHandler<HTMLFormElement>;
  }

// setAuthorReusableComponent
const SetDummyUsernameForm: React.FC<SetDummyUsernameFormProps> = ({ author, setAuthor, submitHandler }) => {

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-6 dark:text-fore-secondary-dark">
            <h2 className='text-xl font-semibold text-center'>Set dummy username</h2>
            <p className="text-center">Enter a dummy username to join the public chat room</p>
            <input type="text" name="author" id="author" placeholder="Enter author name" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" max={30} />
            <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Continue with Dummy Credentials</button>
        </form>
    );
}

export default SetDummyUsernameForm;