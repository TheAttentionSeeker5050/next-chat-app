import { afterAll, afterEach, beforeAll } from '@jest/globals';
import '@testing-library/jest-dom';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { beforeEach } from 'node:test';
import { MemoryServerInstanceOpts } from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import { MongoMemoryServerOpts } from 'mongodb-memory-server-core/lib/MongoMemoryServer';


var mongod: MongoMemoryServer;


  
export async function createMockMongoDbUri() {
  // add authentification to the uri
  const memmoryServerOpts: MongoMemoryServerOpts = {
    instance: {
      dbName: 'nextChatDb',
      ip: '127.0.0.1',
      // port: 45979,
      // storageEngine: "ephemeralForTest",
    },
    auth: {
      enable: false,
      // enable: true,
      // customRootName: 'testAdmin',
      // customRootPwd: 'testAdminPassword'
    }
  };

  // create a mock mongodb uri with automatic auth
  mongod = await MongoMemoryServer.create(memmoryServerOpts);

  // add database name to the uri
  // const port = mongod.opts.instance?.port;
  // const dbName = mongod.opts.instance?.dbName;
  // const auth = mongod.opts.auth;
  // const host = mongod.opts.instance?.ip;
  // const username = mongod.opts.auth?.customRootName;
  // const password = mongod.opts.auth?.customRootPwd;
  
  const uriHostAndPort = mongod.getUri().split('//')[1];
  
  
  
  // let uri = mongod.getUri().replace("mongodb://", `mongodb://${username}:${password}@`);
  // uri +=  dbName + '?authSource=admin'
  // uri += `&authMechanism=SCRAM-SHA-1`;

  // add no auth to the uri
  let uri = mongod.getUri() ;
  // uri +=  dbName + '?authSource=admin'
  // uri += `&authMechanism=SCRAM-SHA-1`;
  
  process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf('/'));
}

beforeAll(async () => {
  await createMockMongoDbUri();
});

afterAll(async () => {
  mongod.stop({ doCleanup: true, force: true });
});