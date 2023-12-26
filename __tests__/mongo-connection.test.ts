import "@testing-library/jest-dom";
import {describe, expect, test, it} from '@jest/globals';

// import mongo driver
import { connect } from "@/utils/mongoDbDriver";

// describe the test suite -----------------------------    
describe("MongoDB Connection", () => {
    it("should connect to the database", async () => {
        const { db, client } = await connect();

        // ensure that the db and client are defined
        expect(db).toBeDefined();
        expect(client).toBeDefined();

        // close the connection
        await client.close();
    
    });
});