import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll} from '@jest/globals';

// import our functions to test and validate
// the model functions are imported from utils/models
import { createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";
import { Db, MongoClient, MongoClientOptions } from "mongodb";

// describe the test suite -----------------------------
describe("User Model", () => {
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

  // create a user and check that it exists
  it("should create, retrieve and delete an user", async () => {

    const users = db.collection('users');

    const mockUser = {
      username: 'testUser',
    };

    try {
      // Create a user
      const newUser = await createUser(mockUser.username, connection, db);
      
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
});