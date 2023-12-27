import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll, afterEach} from '@jest/globals';

// import the mongodb library methods
import { Db, MongoClient, MongoClientOptions, ObjectId } from "mongodb";

// import our models
import { UserModel} from "@/utils/models/User.model";
import { ConversationModel } from "@/utils/models/Conversation.model";
import { MessageContentType, MessageModel } from "@/utils/models/Message.model";

// import our functions to test and validate
import { createConversation, deleteConversation, getConversationByUniqueName, addUserToConversation, getAllConversationsForUser, getConversationById, deleteUserInConversation, addMessageToConversation, deleteMessageInConversation } from "@/utils/models/Conversation.model";
import { createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";

// test the add and delete message functions
describe("Test Message Model", () => {

    let connection : MongoClient;
    let db : Db

    // connect to the database before all tests
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        } as MongoClientOptions);

        db = connection.db('nextChatDb');
    });

    afterAll(async () => {
        await connection.close();
    });

    afterEach(async () => {
        // cleanup the user and conversation collections
        await db.collection('users').deleteMany({});
        await db.collection('conversations').deleteMany({});
    });

    it("should add and delete a message to a conversation", async () => {
        // create a mock conversation model
        const mockConversation : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };

        // create a mock user model
        const mockUser : UserModel = {
            _id: new ObjectId(),
            username: 'testUser',
        };

        // create a mock message model
        const mockMessage1 : MessageModel = {
            _id: new ObjectId(),
            sender: mockUser,
            content: 'test message',
            timestamp: new Date(),
            contentType: MessageContentType.TEXT,
        };

        const mockMessage2 : MessageModel = {
            _id: new ObjectId(),
            sender: mockUser,
            content: 'test message 2',
            timestamp: new Date(),
            contentType: MessageContentType.TEXT,
        };

        try {
            // create a conversation
            const newConversation = await createConversation(mockConversation, connection, db);

            // create a user
            const newUser = await createUser(mockUser.username, connection, db);

            // add the user to the conversation
            await addUserToConversation(newConversation._id.toString(), newUser._id.toString(), connection, db);

            // add a message to the conversation
            await addMessageToConversation(newConversation._id.toString(), mockMessage1, connection, db);
            await addMessageToConversation(newConversation._id.toString(), mockMessage2, connection, db);

            // get the conversation
            const foundConversation = await getConversationById(newConversation._id.toString(), connection, db);

            // assert that the message is added to the conversation
            expect(foundConversation?.messages.length).toBe(2);

            // delete the message
            await deleteMessageInConversation(newConversation._id.toString(), mockMessage1._id.toString(), connection, db);
            await deleteMessageInConversation(newConversation._id.toString(), mockMessage2._id.toString(), connection, db);

            // get the conversation
            const foundConversationAfterDelete = await getConversationById(newConversation._id.toString(), connection, db);

            // assert that the message is deleted from the conversation
            expect(foundConversationAfterDelete?.messages.length).toBe(0);

            // delete the conversation
            await deleteConversation(newConversation._id.toString(), connection, db);

            // delete the user
            await deleteUser(newUser._id.toString(), connection, db);

            // assert that the conversation is deleted from the database and return null
            const deletedConversation = await getConversationById(newConversation._id.toString(), connection, db);
            expect(deletedConversation).toBeNull();

            // check that the user is deleted from the database and return null
            const deletedUser = await getUserByUsername(newUser.username, connection, db);
            expect(deletedUser).toBeNull();

        } catch (error) {
            console.log('Error in test:', error);
            throw error;
        }

    });


});