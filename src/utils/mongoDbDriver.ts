import { MongoClient } from 'mongodb';

const client: any = new MongoClient(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any);


async function connect() {
    const myClient = await client.connect();

    if (!myClient) {
        throw Error('MongoDB Connection Error');
    }
    
    // validate connection
    const db = await myClient.db('nextChatDb');

    if (!db) {
        throw Error('MongoDB Connection Error');
    }

    return { db, client };
}

export { connect };