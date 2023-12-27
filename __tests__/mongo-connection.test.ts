import "@testing-library/jest-dom";
import {describe, expect, test, it, beforeAll, afterAll, afterEach} from '@jest/globals';

// import mongo driver
import { connect } from "@/utils/mongoDbDriver";
import { before } from "node:test";
import { Db, MongoClient, MongoClientOptions } from "mongodb";

// describe the test suite -----------------------------    
describe("MongoDB Connection", () => {

    let connection : MongoClient;
    let db : Db

    // connect to the database before all tests
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        } as MongoClientOptions);

        db = connection.db('nextChatDb');
    }, 15000);

    // close the database connection after all tests
    afterAll(async () => {
        await connection.close();
    });
    
    // afterEach(async () => {
    //     // cleanup the user and conversation collections
    //     await db.collection('users').deleteMany({});
    //     await db.collection('conversations').deleteMany({});
    // });
    
    it("should connect to the database", async () => {
        // const { db, client } = await connect();

        // ensure that the db and client are defined
        expect(db).toBeDefined();
        expect(connection).toBeDefined();

        // close the connection
        await connection.close();
    
    });
});