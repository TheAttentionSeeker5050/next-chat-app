import { FormEvent, FormEventHandler } from "react";
import React from "react";

import { useRouter } from 'next/router';

interface SetAuthorFormProps {
    author: string;
    setAuthor: (newAuthor: string) => void;
  }

// setAuthorReusableComponent
const SetAuthorForm: React.FC<SetAuthorFormProps> = ({ author, setAuthor }) => {

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

        setAuthor(newAuthor);

        // use the navigate hook to redirect to set-author page
        await router.push('/', undefined, { shallow: true });

    }

    return (
        // <section className="flex flex-col gap-6">
            <form onSubmit={submitHandler} className="flex flex-col gap-6">

                <p>Enter your name to join the chat</p>
                <input type="text" name="author" id="author" placeholder="Enter author name" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" />
                <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Submit</button>

            </form>
        // </section>
    );
}

export default SetAuthorForm;