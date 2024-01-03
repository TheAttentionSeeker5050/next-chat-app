import firebaseApp from "@/firebase";
import { getMessagesFromDatabase } from "@/pages";
import { addNewMessageToDatabase } from "@/pages/api/send-message";
// import { MessageModelFirebase } from "@/utils/models/Message.model";
import {
    // assertSucceeds,
    // assertFails,
    initializeTestEnvironment,
    RulesTestEnvironment,
    // RulesTestContext,
} from "@firebase/rules-unit-testing";
import { Database, ThenableReference, connectDatabaseEmulator, getDatabase, off, onChildAdded, onValue, ref } from "firebase/database";
import * as fs from "fs";
import { ObjectId } from "mongodb";

  
let testEnv: RulesTestEnvironment;
let database: Database;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "next-chat-app-f0e97",
    database: {
      rules: fs.readFileSync("database.rules.json", "utf8"), // Path to your Realtime Database rules file
      host: "127.0.0.1",
      port: 9000,
    },
  });

  database = getDatabase();
  connectDatabaseEmulator(database, 'localhost', 9000);
});

afterAll(() => {
  testEnv.cleanup();

});

test("Push new message and get message by item key", async () => {

  // prepare the data
  const message = "Hello World";
  const author = "admin";
  const authorId = new ObjectId().toHexString();
  const conversationId = "default";

  // push the data to the database and store the key
  const newMessageRef = await addNewMessageToDatabase(
    message,
    author,
    authorId,
    conversationId,
    database
  );

  expect(newMessageRef.key !== null).toBe(true);

  // // get the key and retrieve the message, validate the fields using authenticated context
  const getNewMessageRef = ref(database, "conversations/default/messages/" + newMessageRef.key);
  onValue(getNewMessageRef, (snapshot) => {
    const getNewMessageVals = snapshot.val();
    expect(getNewMessageVals.key).not.toBeNull();
    expect(getNewMessageVals.message).toEqual(message);
    expect(getNewMessageVals.author).toEqual(author);
    expect(getNewMessageVals.authorId).toEqual(authorId);
    expect(getNewMessageVals.conversationId).toEqual(conversationId);
  });
});

test("test push new message and update list via listener", async () => {

  

  // prepare the data
  const message = "Hello World";
  const author = "admin";
  const authorId = new ObjectId().toHexString();
  const conversationId = "default";

  // push the data to the database and store the key
  const newMessageRef = await addNewMessageToDatabase(
    message,
    author,
    authorId,
    conversationId,
    database
  );

  // expect request to be successful
  

  const { messagesListRef, messagesArray } = await getMessagesFromDatabase(database);

  // add a message child added listener
  const childAddedListener = onChildAdded(messagesListRef, (snapshot) => {
    const newMessage = snapshot.val();

    // assert that the size of the array is 1
    expect(messagesArray.length).toEqual(1);

    // expect the first item in the array to be the new message
    expect(messagesArray[0].message).toEqual(newMessage.message);

    // expect message key to be the same as the key from the new message ref (there is a field _id where we store the key inside the message object)
    expect(messagesArray[0]._id).toEqual(newMessageRef.key);

    // ensure that the message is not null
    expect(newMessage.message.length).toBeGreaterThan(0);

  });

  // shut down the listener
  off(messagesListRef, 'child_added', childAddedListener);
});