// imports related to next.js custom media
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// useAppContext is a custom hook that returns the context
import {useAppContext} from '@/context/MyContext';

// import navigation hook
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import CurrentUserMessageBubble from '@/components/CurrentUserMessageBubble';
import OtherUserMessageBubble from '@/components/OtherUserMessageBubble';

// import document hook components
import Head from 'next/head';
import NewMessageComponent from '@/components/NewMessageComponent';
import DarkThemeToggleSwitch from '@/components/DarkThemeToggleSwitch';


// import validation function and error type
import { validateText } from '@/utils/validators/validateText';
import { ZodError } from 'zod';
import { MessageModelFirebase } from '@/utils/models/Message.model';
import { GetServerSideProps } from 'next';

// firebase imports
import { Database, connectDatabaseEmulator, getDatabase, off, onChildAdded, onChildChanged, onChildRemoved, onValue, ref } from "firebase/database";
import firebase from '@/firebase';



export default function Home({ messages}: {messages: MessageModelFirebase[]}) {

  // get the context, for the moment, nightMode is a boolean, author is a string, and socketid is an empty string by default
  const { author, setAuthor, authorId, nightMode, setAuthorId } = useAppContext();

  // state variables
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  // get the messages from the server side props
  const [messageList, setMessageList] = useState<MessageModelFirebase[]>(messages);

  
  // if author is empty string, redirect to set-author page, use navigate hook
  let router = useRouter();

  
  
  useEffect(() => {
    
    if (author === '' || authorId === '') {
      // lookout on localstorage for author value, using the getFromLocalStorage function
      const authorFromLocalStorage = localStorage.getItem('author');
      const authorIdFromLocalStorage = localStorage.getItem('authorId');

      if (authorFromLocalStorage && authorIdFromLocalStorage) {
        // set the author in the context
        setAuthor(authorFromLocalStorage);
        setAuthorId(authorIdFromLocalStorage);
      } else {
        // use the navigate hook to redirect to set-author page if author is empty
        router.push('/set-author', undefined, { shallow: true });
      }
    }

  }, [author, authorId, router, setAuthor, setAuthorId]);

  useEffect(() => {
    const conversationId = 'default';

    // get the database
    let database : Database;

    if (process.env.NODE_ENV !== 'test') {
        database = getDatabase();
        
        // get the messages list reference
        const messagesListRef = ref(database, 'conversations/' + conversationId + '/messages/');
        
        // Listener for new messages
        const childAddedListener = onChildAdded(messagesListRef, (snapshot) => {
          const newMessage = snapshot.val();
          
          // Check if the message with the same _id already exists
          const isMessageAlreadyExists = messageList.some((message) => message._id === newMessage._id);
          
          // Update state with the new message
          if (!isMessageAlreadyExists) {
            setMessageList((prevMessages) => [...prevMessages, newMessage]);
          };
        });

        // listener for child removed
        const childRemovedListener = onChildRemoved(messagesListRef, (snapshot) => {
          const newMessage = snapshot.val();

          setMessageList((prevMessages) => prevMessages.filter((message) => message._id !== newMessage._id));
        });

        const onChildEditedListener = onChildChanged(messagesListRef, (snapshot) => {
          const newMessage = snapshot.val();

          setMessageList((prevMessages) => prevMessages.map((message) => {
            if (message._id === newMessage._id) {
              return newMessage;
            } else {
              return message;
            }
          }));
        });
        
        // Clean up the listener when the component unmounts
        return () => {
          off(messagesListRef, 'child_added', childAddedListener);
          off(messagesListRef, 'child_removed', childRemovedListener);
          off(messagesListRef, 'child_changed', onChildEditedListener);
        };

    }

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleAddNewMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set the error to null
    setError(null);

    // get the form data, field name is message
    const formData = new FormData(e.currentTarget);
    const newMessage = formData.get('message') as string;

    // store the validation result in a constant
    const validateResult = validateText(newMessage) as { success: boolean; error?: ZodError<string>; data?: any };

    // if any of the validation fails, add the error message to the state variable, which will be displayed in the UI
    if (validateResult.success === false) {
      // print error message inside zo error if it exists
      if (validateResult.error) {
        setError(validateResult.error.issues[0].message);
      }
      
      // disapear the error message after 8 seconds
      setTimeout(() => {
        setError(null);
      }, 5*1000);
      return;
    }
    
    // add the message to the database using the addNewMessageToDatabase function
    try {
      // make post request to the api on /api/add-message
      fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: newMessage,
          authorId: authorId,
          author: author,
        })
      });
    } catch (error) {
      setError("Error sending message");
    }

    
    // delete the message from the state variable
    setMessage('');
    
    // use the navigate hook to redirect to set-author page
    router.push('/#bottom-messages', undefined, { shallow: true });
    
  }

  return (
    <>
      <Head>
        <title>Next.js Chat App - Group Conversation</title>
        <meta name="description" content="Group Conversation" />
      </Head>
      <main className={`${inter.className} ${nightMode === true ? 'dark' : ''}  flex flex-col gap-6`}>
        <nav className="bg-back-secondary-light pt-8 pb-10 mb-4 flex flex-col gap-4 items-center">
          <h1 className='text-3xl font-semibold dark:text-red-500'>Group Conversation</h1>
          <DarkThemeToggleSwitch />
        </nav>

        <section id="message-list-container" className="flex flex-col gap-6 w-full px-6 mb-20">
          
          {/* map all the messages, take the code above as example, but only if there are messages to display */}
          { messageList &&
            messageList.map((message, index) => {
              
              if (message.userId === authorId) {
                return (
                  <div className="self-end " key={index}>
                    <CurrentUserMessageBubble author={message.username} authorId={message.userId} message={message.message} date={new Date(message.updatedAt)} />
                  </div>
                );
              } else {
                return (
                  <div className="self-start " key={index}>
                    <OtherUserMessageBubble author={message.username} authorId={message.userId} message={message.message} date={new Date(message.updatedAt)} />
                  </div>
                );
              }
            })
          }

          <p id='bottom-messages' className='mb-24'></p>
          
        </section>


        <NewMessageComponent error={error} handleAddNewMessage={handleAddNewMessage} message={message} handleChange={handleChange} />
      </main>
    </>
  );
};

// function to get the messages from the database
export const getMessagesFromDatabase = (database?:Database) => {
  const conversationId = 'default';

  if (database === undefined || database === null) {
    database = getDatabase(firebase);
  }
  
  const messagesListRef = ref(database, 'conversations/' + conversationId + '/messages/');
  let messagesArray: MessageModelFirebase[] = [];

  onValue(messagesListRef, async (snapshot) => {
    const data = snapshot.val();

    // convert the object to an array and store it in the messagesArray variable
    messagesArray = Object.values(data);

  });

  // detach 
  off(messagesListRef, 'value');

  return {database, messagesListRef, messagesArray};
};

// get server side props the messages from the firestore database
export const getServerSideProps: GetServerSideProps = async () => {
  // get the messages from the database
  const { database, messagesListRef, messagesArray } = await getMessagesFromDatabase();

  // return the messages as props
  return {
    props: {
      messages: messagesArray,
    }
  }
}
