import { FormEventHandler } from "react";
import React from "react";

interface RegisterProps {
    submitHandler: FormEventHandler<HTMLFormElement>;
}

const RegisterForm: React.FC<RegisterProps> = ({
    submitHandler,
}) => {
    return (
        <form onSubmit={submitHandler} className="flex flex-col w-min gap-6 dark:text-fore-secondary-dark">

            <div>
                <label htmlFor="email" className="ml-1">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter email" className="border-2 mt-2 border-fore-secondary-light py-1 px-2 rounded-lg" />
            </div>

            <div>
                <label htmlFor="password" className="ml-1">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter password"  className="border-2 mt-2 border-fore-secondary-light py-1 px-3 rounded-lg" />
            </div>
            <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1 hover:bg-blue-balloons-light-hover">Submit</button>

        </form>
    );
}

export default RegisterForm;