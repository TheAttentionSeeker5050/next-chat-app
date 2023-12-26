import "@testing-library/jest-dom";
import {describe, expect, test, it} from '@jest/globals';

// import our functions to test and validate
// the model functions are imported from utils/models
import { createUser, deleteUser, getUserByUsername } from "@/utils/models/User.model";


// describe the test suite -----------------------------
// make a dummy test to always pass
describe("Dummy test", () => {
  it("should always pass", () => {
    expect(true).toBe(true);
  });
});