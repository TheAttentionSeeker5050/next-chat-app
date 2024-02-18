import { FormEventHandler } from "react";
import React from "react";


interface SetAuthorFormProps {
    author: string;
    setAuthor: (newAuthor: string) => void;
    submitHandler: FormEventHandler<HTMLFormElement>;
  }

// setAuthorReusableComponent
const SetAuthorForm: React.FC<SetAuthorFormProps> = ({ author, setAuthor, submitHandler }) => {

    return (
        // <section className="flex flex-col gap-6">
            <form onSubmit={submitHandler} className="flex flex-col w-min gap-6 dark:text-fore-secondary-dark">

                <p className="text-center">Enter your name to join the chat as an anonymous user</p>
                <input type="text" name="author" id="author" placeholder="Enter author name" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" max={35} />
                <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Submit</button>

            </form>
        // </section>
    );
}

export default SetAuthorForm;