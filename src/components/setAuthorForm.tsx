import { FormEvent, FormEventHandler } from "react";


// setAuthorReusableComponent
export default function SetAuthorForm() {

    // do some onSubmit function to set the author, use form handler as event param
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        

        e.preventDefault();

        const formData = new FormData(e.currentTarget)


        // alert the author
        alert('Author set: ' + formData.get('author'));
    }

    return (
        // <section className="flex flex-col gap-6">
            <form onSubmit={submitHandler} className="flex flex-col gap-6">

                <p>Enter your name to join the chat</p>
                <input type="text" name="author" id="author" placeholder="Enter author name" className="border-2 pl-3 pr-2 border-fore-secondary-light py-1 rounded-lg" />
                <button type="submit" className="text-fore-blue-balloons-light bg-blue-balloons-light rounded-xl px-2 py-1">Submit</button>

            </form>
        // </section>
    );
}