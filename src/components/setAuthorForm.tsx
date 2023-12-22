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
        <div>

            <form onSubmit={submitHandler}>
                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}