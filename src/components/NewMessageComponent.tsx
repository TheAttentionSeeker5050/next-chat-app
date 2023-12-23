

export default function NewMessageComponent() {
    return (
        // create a new message component, where the message bubble contain a send button inside to make it look like part of the message input
        <form className="flex flex-col w-full px-6">
             <div className="flex flex-row w-full border rounded-md p-2 bg-white shadow-sm ring ring-gray-400 focus-within:ring focus-within:ring-gray-700">
                <input
                    type="text"
                    name="message"
                    id="message"
                    className="flex-grow mr-2 outline-none focus:outline-none"
                    placeholder="Type a message..."
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm p-2">Send</button>
            </div>
        </form>
    )
}