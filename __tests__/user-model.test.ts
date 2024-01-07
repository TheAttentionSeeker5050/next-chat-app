import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll} from '@jest/globals';

// import our functions to test and validate
// the model functions are imported from utils/models
import { UserProvider, createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";
import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { afterEach } from "node:test";

// describe the test suite -----------------------------
describe("Test User Model", () => {
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

  // create a user and check that it exists
  it("should create, retrieve and delete a dummy user user", async () => {

    const users = db.collection('users');

    const mockUser = {
      username: 'testUser',
    };

    try {
      // Create a user
      const newUser = await createUser(mockUser.username, UserProvider.DUMMY_USER, connection, db);
      
      // Assert that the user is created successfully
      expect(newUser.username).toBe('testUser');
      
      // assert get user by username
      const foundUser = await getUserByUsername(mockUser.username, connection, db);

      // assert that the user is found
      expect(foundUser?.username).toBe(newUser.username);

      // delete the user
      await deleteUser(newUser._id.toString(), connection, db);

      // assert that the user is deleted
      const deletedUser = await users.findOne({ _id: newUser._id });

      // assert that the user is null
      expect(deletedUser).toBeNull();

    } catch (error) {
      // assert that the error is null, in case of error it will fail the test
      expect(error).toBeNull();
    }

  });
  // attempt to create dummy user twice
  it("should not create a dummy user twice", async () => {
      
      const users = db.collection('users');
  
      const mockUser = {
        username: 'testUser1',
        provider: UserProvider.DUMMY_USER
      };
  
      try {
        // Create a user
        const newUser = await createUser(mockUser.username, UserProvider.DUMMY_USER, connection, db);
        
        // Assert that the user is created successfully
        expect(newUser.username).toBe('testUser');
        
        // assert get user by username
        const foundUser = await getUserByUsername(mockUser.username, connection, db);
  
        // assert that the user is found
        expect(foundUser?.username).toBe(newUser.username);
  
        // create the user again
        const newUser2 = await createUser(mockUser.username, UserProvider.DUMMY_USER, connection, db);

        // assert that user id 1 and user 2 are the same
        expect(newUser._id).toBe(newUser2._id);
  
      } catch (error) {
        // assert that the error is null, in case of error it will fail the test
        expect(error).not.toBeNull();
      }
  
    });

    // attempt to create, retrieve and delete an email user
    it("should create, retrieve and delete an email user", async () => {

      const users = db.collection('users');
  
      const mockUser = {
        username: 'testUser2',
        provider: UserProvider.EMAIL
      };
  
      try {
        // Create a user
        const newUser = await createUser(mockUser.username, UserProvider.EMAIL, connection, db);
        
        // Assert that the user is created successfully
        expect(newUser.username).toBe('testUser2');
        
        // assert get user by username
        const foundUser = await getUserByUsername(mockUser.username, connection, db);
  
        // assert that the user is found
        expect(foundUser?.username).toBe(newUser.username);
  
        // delete the user
        await deleteUser(newUser._id.toString(), connection, db);
  
        // assert that the user is deleted
        const deletedUser = await users.findOne({ _id: newUser._id });
  
        // assert that the user is null
        expect(deletedUser).toBeNull();
  
      } catch (error) {
        // assert that the error is null, in case of error it will fail the test
        expect(error).toBeNull();
      }
      
    });

});

