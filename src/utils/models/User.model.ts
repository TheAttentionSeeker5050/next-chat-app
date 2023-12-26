// import the mongodb driver methods
import { ObjectId, InsertOneResult } from 'mongodb';
import { connect } from '@/utils/mongoDbDriver';
import { ConversationModel } from '@/utils/models/Conversation.model';

// the user model definition ---------------------------------
export interface UserModel {
  _id: ObjectId;
  username: string;
}

// the user model insert result object
type CreateUserResult = InsertOneResult<UserModel>;
  
// the user model crud operations ----------------------------
// create a new user
export async function createUser(iUsername: string): Promise<UserModel> {
  const { db } = await connect();
  const collection = db.collection<UserModel>('users');

  const result: CreateUserResult = await collection.insertOne({
    username: iUsername,
    _id: new ObjectId(),
  });

  const insertedId = result.insertedId;

  if (!insertedId) {
    throw new Error('User creation failed');
  }

  const createdUser = await collection.findOne({ _id: insertedId });

  if (!createdUser) {
    throw new Error('User not found after creation');
  }

  return createdUser;
}

// delete a user and all their appearances in conversations
export async function deleteUser(userId: string): Promise<void> {
    const { db } = await connect();
    const usersCollection = db.collection<UserModel>('users');
    
    await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    // delete the user from all conversations
    const conversationsCollection = db.collection<ConversationModel>('conversations');
    await conversationsCollection.updateMany(
        { 'participants._id': new ObjectId(userId) },
        { $pull: { participants: { _id: new ObjectId(userId) } } }
    );

    // set the admin of all conversations to the first participant
    await conversationsCollection.updateMany(
        { 'admin._id': new ObjectId(userId) },
        { $set: { admin: null } }
    );

}

// get a user by their username
export async function getUserByUsername(username: string): Promise<UserModel | null> {
    const { db } = await connect();
    const collection = db.collection<UserModel>('users');

    return collection.findOne({ username });
}
