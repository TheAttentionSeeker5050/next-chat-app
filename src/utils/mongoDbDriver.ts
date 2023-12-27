import { MongoClient, Db, MongoClientOptions } from 'mongodb';

interface Connection {
    db: Db;
    client: MongoClient;
}

const client = new MongoClient(process.env.MONGODB_URI as string, {
  useNewUrlParser: false,
  useUnifiedTopology: false,
} as MongoClientOptions);


async function connect() {
    const myClient = await client.connect();    

    if (!myClient) {
      throw new Error('MongoDB Connection Error');
    }
  
    const db = await myClient.db('nextChatDb')

    
    
  
    if (!db) {
      throw new Error('MongoDB Connection Error');
    }
  
    return { db, client };
}

export { connect };