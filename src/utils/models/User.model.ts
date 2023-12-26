// import the mongodb driver methods
import { ObjectId, InsertOneResult } from 'mongodb';
import { connect } from '@/utils/mongoDbDriver';

// the user model definition ---------------------------------
export interface UserModel {
  _id: ObjectId;
  username: string;
}

// the user model insert result object
type CreateUserResult = InsertOneResult<UserModel>;
  
// the user model crud operations ----------------------------
// create a new user
async function createUser(iUsername: string): Promise<UserModel> {
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

export { createUser };