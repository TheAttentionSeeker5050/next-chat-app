import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// the props interface for this component
interface NewMessageComponentProps {
 error: string | null;
 handleAddNewMessage: (e: React.FormEvent<HTMLFormElement>) => void;   
}

export default function NewMessageComponent({error, handleAddNewMessage}: NewMessageComponentProps) {
    return (
        // create a new message component, where the message bubble contain a send button inside to make it look like part of the message input
        <form className="fixed bottom-0 flex flex-col w-screen bg-back-secondary-light px-6 py-2" onSubmit={handleAddNewMessage}>
            {/* if there is an error, display the error message */}
            {error && <p className="text-red-500 mb-2">{error}</p>}

             <div className="flex flex-row w-full border rounded-md p-2 bg-white shadow-sm ring ring-gray-balloons-light focus-within:ring focus-within:ring-fore-tertiary-light">
                <input
                    type="text"
                    name="message"
                    id="message"
                    className="flex-grow mr-2 outline-none focus:outline-none"
                    placeholder="Type a message..."
                    max={600}
                />
                <button type="submit" className="bg-blue-balloons-light hover:bg-blue-balloons-light-hover text-white rounded-md shadow-sm py-1 px-3">
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            </div>
        </form>
    )
}