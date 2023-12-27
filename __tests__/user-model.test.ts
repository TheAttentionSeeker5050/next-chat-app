import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll} from '@jest/globals';

// import our functions to test and validate
// the model functions are imported from utils/models
import { createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";

// describe the test suite -----------------------------
describe("User Model", () => {
  // create a user and check that it exists
  it("should create a user", async () => {

    console.log('Jest MONGODB_URI:', process.env.MONGODB_URI);

    // Create a user
    const newUser = await createUser('testUser');

    // Assert that the user is created successfully
    expect(newUser.username).toBe('testUser');
    // Add more assertions as needed
  });
});