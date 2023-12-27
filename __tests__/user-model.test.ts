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

  // create a user and check that it exists
  it("should create a user", async () => {

    const users = db.collection('users');

    const mockUser = {
      username: 'testUser',
    };

    // Create a user
    const newUser = await createUser(mockUser.username, connection, db);

    // Assert that the user is created successfully
    expect(newUser.username).toBe('testUser');
    // Add more assertions as needed
  });
});