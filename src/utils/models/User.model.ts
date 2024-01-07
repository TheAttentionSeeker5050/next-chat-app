// import the mongodb driver methods
import { ObjectId, InsertOneResult, MongoClient, Db } from 'mongodb';

// enum for the user provider
export enum UserProvider {
  DUMMY_USER = 'dummy-user',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  TWITTER = 'twitter',
  MICROSOFT = 'microsoft',
  EMAIL = 'email',
  APPLE = 'apple',
}
// the user model definition ---------------------------------
export interface UserModel {
  _id: ObjectId;
  username: string;
  provider: UserProvider;
}

// the user model insert result object
type CreateUserResult = InsertOneResult<UserModel>;
  
// the user model crud operations ----------------------------
// create a new user
export async function createUser(iUsername: string, provider: string, client?: MongoClient, db?: Db): Promise<UserModel> {
  

  if (!db) {
    throw new Error('MongoDB Connection Error');
  }

  if (!client) {
    throw new Error('MongoDB Connection Error');
  }

  // console.log('Connected to MongoDB');
  const collection = db.collection<UserModel>('users');

  try {

    // first check if the user already exists
    const oldUserWidthSameUsername = await collection.findOne({ username: iUsername });

    // if the user already exists, throw an error
    // because of the app's design, we just need to return the user if they already exist
    if (oldUserWidthSameUsername ) {
      if (provider === UserProvider.DUMMY_USER) {
        // if the user is a dummy user, and saved user is dummy user we can just return the user
        if (oldUserWidthSameUsername.provider === UserProvider.DUMMY_USER) {
          return oldUserWidthSameUsername;
        } else {
          throw new Error('User already exists');
        }
      } else if (provider === UserProvider.EMAIL) {
        // if the user is an email user, and saved user is email user we can just return the user
        throw new Error('User already exists');
      }
    }

    const result: CreateUserResult = await collection.insertOne({
      username: iUsername,
      _id: new ObjectId(),
      provider: provider as UserProvider,
    });    
    
    // make sure that the user is created successfully
    // if not, throw an error
    const insertedId = result.insertedId;
    
    if (!insertedId) {
      throw new Error('User creation failed');
    }
    
    const createdUser = await collection.findOne({ _id: insertedId });
    
    if (!createdUser) {
      throw new Error('User not found after creation');
    }
    
    return createdUser;
  } catch (error) {
    console.log('Error creating user:', error);
    throw error;
  }
}

// delete a user and all their appearances in conversations
export async function deleteUser(userId: string, client?: MongoClient, db?: Db): Promise<void> {
    
  if (!db) {
    throw new Error('MongoDB Connection Error');
  }

  if (!client) {
    throw new Error('MongoDB Connection Error');
  }

  const usersCollection = db.collection<UserModel>('users');
  
  // delete the user
  await usersCollection.deleteOne({ _id: new ObjectId(userId) });

}

// get a user by their username
export async function getUserByUsername(username: string, client?: MongoClient, db?: Db): Promise<UserModel | null> {
    
    if (!db) {
      throw new Error('MongoDB Connection Error');
    }
  
    if (!client) {
      throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection<UserModel>('users');

    return collection.findOne({ username });
}
