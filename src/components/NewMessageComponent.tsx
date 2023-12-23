

export default function NewMessageComponent() {
    return (
        // create a new message component, where the message bubble contain a send button inside to make it look like part of the message input
        <form className="fixed bottom-0 flex flex-col w-screen bg-back-secondary-light px-6 py-2">
             <div className="flex flex-row w-full border rounded-md p-2 bg-white shadow-sm ring ring-gray-balloons-light focus-within:ring focus-within:ring-fore-tertiary-light">
                <input
                    type="text"
                    name="message"
                    id="message"
                    className="flex-grow mr-2 outline-none focus:outline-none"
                    placeholder="Type a message..."
                />
                <button className="bg-blue-balloons-light hover:bg-blue-balloons-light-hover text-white rounded-md shadow-sm p-2">Send</button>
            </div>
        </form>
    )
}