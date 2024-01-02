import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React, { FormEvent, useEffect, useState } from "react";


// the props interface for this component
interface NewMessageComponentProps {
    error: string | null;
    handleAddNewMessage: (e: React.FormEvent<HTMLFormElement>) => void;   
    message: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NewMessageComponent({error, handleAddNewMessage, message, handleChange}: NewMessageComponentProps) {

    // use state to store the number of rows
    const [rows, setRows] = useState(1);

    // window is not defined during the build process, so we need to check if window is defined first

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const viewportWidth = window.innerWidth - 135; // the width of the viewport minus the width of everything in between the message input and the viewport

            // usign tailwind base font size, 1rem = 16px, calculate the number of characters per line based on the viewport width and calculate the number of rows based on the content, we choose 9 because not all characters are the same width, so we choose a number that is slightly larger than the average width of a character, this works well for most viewport widths
            setRows(Math.min(Math.ceil(message.length / (viewportWidth / 9)), 6));
        }

    }, [message]);

    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     handleAddNewMessage(e);
    //   };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // this will submit the form if the user presses the Enter or Intro key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline on Enter key
            // get the submit button
            const submitButton = document.getElementById('new-msg-form-submit');
            // click on the submit button
            submitButton?.click();
        }
    };

    return (
        // create a new message component, where the message bubble contain a send button inside to make it look like part of the message input
        <form className="fixed bottom-0 flex flex-col w-screen bg-back-secondary-light px-6 py-2" onSubmit={handleAddNewMessage}>
            {/* if there is an error, display the error message */}
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex flex-row w-full border rounded-md p-2 bg-white shadow-sm ring ring-gray-balloons-light focus-within:ring focus-within:ring-fore-tertiary-light">
                {/* make the input to expand up to 6 lines */}
                <textarea
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                name="message"
                className="flex-grow mr-2 outline-none focus:outline-none resize-none px-2"
                placeholder="Type a message..."
                rows={Math.max(rows, 1)}
                maxLength={600}
                />

                <button type="submit" id="new-msg-form-submit" className="bg-blue-balloons-light hover:bg-blue-balloons-light-hover text-white rounded-md shadow-sm py-1 px-3 mt-auto">
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            </div>
        </form>
    )
}