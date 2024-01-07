import { saveToLocalStorage } from "@/context/localStorageHandlers";
import { UserModel } from "@/utils/models/User.model";
import { validateAuthorName } from "@/utils/validators/validateAuthorName";
import { NextRouter } from "next/router";
import { FormEvent, FormEventHandler } from "react";
import React from "react";
import { ZodError } from "zod";


interface SetDummyUsernameFormProps {
    // author: string;
    setAuthor: (newAuthor: string) => void;
    // submitHandler: FormEventHandler<HTMLFormElement>;
    setError: (error: string | null) => void;
    setAuthorId: (authorId: string) => void;
    router: NextRouter;
}

// setAuthorReusableComponent
const SetDummyUsernameForm: React.FC<SetDummyUsernameFormProps> = ({ setAuthor, setError, setAuthorId, router}) => {

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
    const user = await res.json() as { error?: string; user?: UserModel };

    if (user.error) {
      setError('Could not set the dummy username:' + user.error);
      return;
    }

    if (!user.user) {
      setError('Something went wrong while setting the dummy username');
      return;
    } else {

      // set app context author
      setAuthor(user.user.username);
      // setAuthorId(user._id);
      
      // use the localstorage to set the author using our methods inside context dir
      saveToLocalStorage('author', user.user.username);
      // saveToLocalStorage('authorId', user._id);
      
      // use the navigate hook to redirect to set-author page
      await router.push('/', undefined, { shallow: true });
    }
}

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-4 dark:text-white">
            <h2 className='text-xl font-semibold text-center text-blue-balloons-secondary-light dark:text-fore-secondary-dark'>Set dummy username</h2>
            <p className="text-center">Enter a dummy username to join the public chat room</p>
            <input type="text" name="author" id="author" placeholder="Enter author name" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg text-input-box-back-dark" max={30} />
            <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Continue with Dummy Credentials</button>
        </form>
    );
}

export default SetDummyUsernameForm;