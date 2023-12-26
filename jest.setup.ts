import { afterAll, beforeAll } from '@jest/globals';
import '@testing-library/jest-dom';
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongod: MongoMemoryServer;

async function createMockMongoDbUri() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGODB_URI = uri;
}

beforeAll(async () => {
  await createMockMongoDbUri();
});

