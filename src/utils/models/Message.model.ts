// import required models
import { UserModel } from '@/utils/models/User.model';
import { ObjectId } from 'mongodb';

// make the message content type an enum
export enum MessageContentType {
    TEXT = 'text',
    IMAGE = 'image',
    FILE = 'file',

}

// the message model definition ---------------------------------
export interface MessageModel {
    _id: ObjectId,
    sender: UserModel,
    content: string, // if it is an image or file, it should be a url which points to the file
    timestamp: Date,
    contentType: MessageContentType
}

export interface MessageModelFirebase {
    _id: string,
    userId: string,
    username: string,
    message: string,
    contentType: MessageContentType,
    createdAt: Date,
    updatedAt: Date,
}

// crud operations for this are handled by the conversation model