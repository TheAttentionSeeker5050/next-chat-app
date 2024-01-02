import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import * as fs from "fs";

// start the local test firebase server
beforeAll(async () => {
    let testEnv = await initializeTestEnvironment({
        projectId: "demo-project-1234",
        // firestore: {
        //     // we will read the firebase rules
        //   rules: fs.readFileSync("firebase.json", "utf8"),
        // },
    });
});