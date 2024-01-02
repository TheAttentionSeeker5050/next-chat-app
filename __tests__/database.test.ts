import {
    assertSucceeds,
    assertFails,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import * as fs from "fs";
  
let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "next-chat-app-f0e97",
    database: {
      rules: fs.readFileSync("database.rules.json", "utf8"), // Path to your Realtime Database rules file
      host: "127.0.0.1",
      port: 9000,
    },
  });
});

afterAll(() => {
  testEnv.cleanup();
});

test("Allow read access to a specific path", async () => {
  const alice = testEnv.authenticatedContext("alice");
  await assertSucceeds(alice.database().ref("users/alice").once("value"));
});
  