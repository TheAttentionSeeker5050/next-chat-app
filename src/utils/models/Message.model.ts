// import required models
import { UserModel } from '@/utils/models/User.model';

// the message model definition ---------------------------------
export interface MessageModel {
    sender: UserModel,
    content: string, // if it is an image or file, it should be a url which points to the file
    timestamp: Date,
    contentType: string, // text, image for the moment
}

// crud operations for this are handled by the conversation model