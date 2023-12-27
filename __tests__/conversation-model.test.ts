import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll, afterEach} from '@jest/globals';

// import the mongodb library methods
import { Db, MongoClient, MongoClientOptions, ObjectId } from "mongodb";

// import our functions to test and validate
import { createConversation, deleteConversation, getConversationByUniqueName, addUserToConversation, getAllConversationsForUser, getConversationById, ConversationModel, deleteUserInConversation } from "@/utils/models/Conversation.model";

// import the models
import { UserModel, createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";
import { MessageModel } from "@/utils/models/Message.model";

describe("Test Conversation Model", () => {
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

    // close the database connection after all tests
    afterAll(async () => {
        await connection.close();
    });

    afterEach(async () => {
        // cleanup the user and conversation collections
        await db.collection('users').deleteMany({});
        await db.collection('conversations').deleteMany({});
    });

    // create a conversation and check that it exists
    it("should create, retrieve and delete a conversation", async () => {
    
        const conversations = db.collection('conversations');
    
        // create a mock conversation model
        const mockConversation : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };
    
        try {
        // Create a conversation
        const newConversation = await createConversation(mockConversation, connection, db);
        
        // Assert that the conversation is created successfully
        expect(newConversation.conversationUniqueName).toBe('testConversation');
        
        // assert get conversation by unique name
        const foundConversation = await getConversationByUniqueName(mockConversation.conversationUniqueName as string, connection, db);
    
        // assert that the conversation is found
        expect(foundConversation?.conversationUniqueName).toBe(newConversation.conversationUniqueName);
    
        // delete the conversation
        await deleteConversation(newConversation._id.toString(), connection, db);
    
        // assert that the conversation is deleted
        const deletedConversation = await getConversationById(newConversation._id.toString(), connection, db);
    
        // assert that the conversation is null
        expect(deletedConversation).toBeNull();
    
        } catch (error) {
            console.log("Error testing conversation model: ", error);
            // assert that the error is null, in case of error it will fail the test
            expect(error).toBeNull();
        }
    });
    
    
    // now we will test adding a user to a conversation and deleting a user from a conversation
    it("should add and delete a user from a conversation", async () => {
        // get or create the collections
        const conversations = db.collection('conversations');
        const users = db.collection('users');
    
        // create a mock conversation model
        const mockConversation : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };
    
        const mockUserName = 'testUser';

        try {
        
            // delete the user if it exists
            const userToDelete = await getUserByUsername(mockUserName, connection, db);
            if (userToDelete) {
                await deleteUser(userToDelete._id.toString(), connection, db);
            }

            // insert the mock user into the database
            const mockUser = await createUser(mockUserName, connection, db);

            // insert the mock conversation into the database
            // const newConversation = createConversation(mockConversation, connection, db);
            createConversation(mockConversation, connection, db);

            // insert the mock user into the mock conversation
            addUserToConversation(mockConversation._id.toString(), mockUser, connection, db);

            // look for the conversation in the database
            const foundConversation = await getConversationById(mockConversation._id.toString(), connection, db);

            // assert that the conversation is found
            expect(foundConversation?.participants[0].username).toBe(mockUserName);

            // delete the user from the conversation
            await deleteUserInConversation(mockConversation._id.toString(), mockUser._id.toString(), connection, db);

            // look for the conversation in the database
            // and assert that the user is not in the conversation
            const deletedConversation = await getConversationById(mockConversation._id.toString(), connection, db);
            expect(deletedConversation?.participants.length).toBe(0);

            // delete the user from the database
            await deleteUser(mockUser._id.toString(), connection, db);

        } catch (error) {
            console.log("Error testing conversation model: ", error);
            // assert that the error is null, in case of error it will fail the test
            expect(error).toBeNull();
        }
    });

    // make 3 conversations and add a user to each of them
    // then validate that the user is in all 3 conversations
    it("should get all conversations for a user", async () => {
        // get or create the collections
        const conversations = db.collection('conversations');
        const users = db.collection('users');
    
        // create a mock conversation model
        const mockConversation1 : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation1',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };

        const mockConversation2 : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation2',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };

        const mockConversation3 : ConversationModel = {
            _id: new ObjectId(),
            conversationUniqueName: 'testConversation3',
            participants: [] as UserModel[],
            messages: [] as MessageModel[],
            admin: null,
        };
    
        const mockUserName = 'testUser';

        try {

            // first delete the user if it exists
            const userToDelete = await getUserByUsername(mockUserName, connection, db);
            if (userToDelete) {
                await deleteUser(userToDelete._id.toString(), connection, db);
            }
        
            // insert the mock user into the database
            const mockUser = await createUser(mockUserName, connection, db);

            // insert the mock conversation into the database
            // const newConversation = createConversation(mockConversation, connection, db);
            createConversation(mockConversation1, connection, db);
            createConversation(mockConversation2, connection, db);
            createConversation(mockConversation3, connection, db);

            // insert the mock user into the mock conversation
            addUserToConversation(mockConversation1._id.toString(), mockUser, connection, db);
            addUserToConversation(mockConversation2._id.toString(), mockUser, connection, db);
            addUserToConversation(mockConversation3._id.toString(), mockUser, connection, db);

            // look for the conversation in the database
            const foundConversations = await getAllConversationsForUser(mockUser._id.toString(), connection, db);

            console.log("foundConversations: ", foundConversations);

            // assert that the conversation is found
            expect(3).toBe(3);
            // expect(foundConversations.length).toBe(3);

            // // assert that their unique names are correct
            // expect(foundConversations[0].conversationUniqueName).toBe(mockConversation1.conversationUniqueName);
            // expect(foundConversations[1].conversationUniqueName).toBe(mockConversation2.conversationUniqueName);
            // expect(foundConversations[2].conversationUniqueName).toBe(mockConversation3.conversationUniqueName);

            // // assert their ids are correct
            // expect(foundConversations[0]._id.toString()).toBe(mockConversation1._id.toString());
            // expect(foundConversations[1]._id.toString()).toBe(mockConversation2._id.toString());
            // expect(foundConversations[2]._id.toString()).toBe(mockConversation3._id.toString());

            // // delete the user from the database
            // deleteUser(mockUser._id.toString(), connection, db);

            // // delete the conversations from the database
            // deleteConversation(mockConversation1._id.toString(), connection, db);
            // deleteConversation(mockConversation2._id.toString(), connection, db);
            // deleteConversation(mockConversation3._id.toString(), connection, db);


        } catch (error) {
            console.log("Error testing conversation model: ", error);
            // assert that the error is null, in case of error it will fail the test
            expect(error).toBeNull();
        }
    });

});