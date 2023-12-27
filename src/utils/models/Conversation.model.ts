// import required models
import { UserModel } from '@/utils/models/User.model';
import {MessageModel} from '@/utils/models/Message.model';

// import required mongodb library methods
import { Db, InsertOneResult, MongoClient, ObjectId } from 'mongodb';
import { connect } from '@/utils/mongoDbDriver';

// the conversation model definition ---------------------------------
export interface ConversationModel {
    _id: ObjectId,
    conversationUniqueName?: string,
    participants: UserModel[],
    messages: MessageModel[],
    admin: UserModel | null,
}


type CreateConversationResult = InsertOneResult<ConversationModel>;


// the conversation model crud operations ----------------------------
export async function getConversationById(conversationId?: string, client?: MongoClient, db?: Db): Promise<ConversationModel | null> {

    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection<ConversationModel>('conversations');

    // if no conversation id is provided, return the first conversation in the collection, this is used in the stage 1 of our application development, and will be removed in subsequent stages
    if (!conversationId) {
        return collection.findOne();
    }

    return collection.findOne({ _id: new ObjectId(conversationId) });
}

export async function getAllConversationsForUser(userId: string, client?: MongoClient, db?: Db): Promise<ConversationModel[]> {
    
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }
    
    const collection = db.collection<ConversationModel>('conversations');

    return collection.find({ 'participants._id': new ObjectId(userId) }).toArray();
}

export async function getConversationByUniqueName(conversationUniqueName: string, client?: MongoClient, db?: Db): Promise<ConversationModel | null> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection<ConversationModel>('conversations');

    
    return collection.findOne({ conversationUniqueName });
}

export async function createConversation(conversationModel: ConversationModel, client?: MongoClient, db?: Db): Promise<ConversationModel> {
    
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection<ConversationModel>('conversations');

    const result: CreateConversationResult = await collection.insertOne(conversationModel);

    const insertedId = result.insertedId;

    if (!insertedId) {
        throw new Error('Conversation creation failed');
    }

    const createdConversation = await collection.findOne({ _id: insertedId });

    if (!createdConversation) {
        throw new Error('Conversation not found after creation');
    }

    return createdConversation;
}

export async function deleteConversation(conversationId: string, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection('conversations');
  
    await collection.deleteOne({ _id: new ObjectId(conversationId) });
}


// the crud operations for the messages in a conversation ------------
export async function addMessageToConversation(conversationId: string, message: MessageModel, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection('conversations');
  
    await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $push: { messages: message } }
    );
}
  
export async function deleteMessageInConversation(conversationId: string, messageId: string, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection('conversations');
  
    await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $pull: { messages: { _id: new ObjectId(messageId) } } }
    );
}


// crud operations for the participants (or users) in a conversation ------------
export async function addUserToConversation(conversationId: string, user: UserModel, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection('conversations');
    
    // append user to the participants array inside the conversation document
    await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $push: { participants: user } }
    );

}

export async function deleteUserInConversation(conversationId: string, userId: string, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }

    const collection = db.collection('conversations');
  
    await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $pull: { participants: { _id: new ObjectId(userId) } } } // remove all instances of the user as a participant
    );
  
    // we need to remove it as an admin as well if it is an admin
    await collection.updateOne(
        { _id: new ObjectId(conversationId), admin: { _id: new ObjectId(userId) } },
        { $unset: { admin: null } } // remove the admin if the user is the admin, otherwise do nothing
    );
  
    await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $pull: { messages: { 'sender._id': new ObjectId(userId) } } } // remove all instances of messages sent by the user
    );
}

export async function makeUserAdminInConversation(conversationId: string, userId: string, client?: MongoClient, db?: Db): Promise<void> {
    if (!db) {
        throw new Error('MongoDB Connection Error');
    }

    if (!client) {
        throw new Error('MongoDB Connection Error');
    }
    
    const collection = db.collection('conversations');
  
    // make sure the user is a participant in the conversation
    // get the conversation and check if the user is a participant
    const conversation = await collection.findOne({ _id: new ObjectId(conversationId) });

    if (!conversation) {
        throw new Error('Conversation not found');
    }

    const userIsParticipant = conversation.participants.some((participant: UserModel) => participant._id.toString() === userId);

    if (!userIsParticipant) {
        throw new Error('User is not a participant in the conversation');
    }

    // make the user the admin
    const result = await collection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $set: { admin: { _id: new ObjectId(userId) } } }
    );

    if (!result.matchedCount) {
        throw new Error('Conversation not found');
    }

    if (!result.modifiedCount) {
        throw new Error('User is already the admin');
    }
}