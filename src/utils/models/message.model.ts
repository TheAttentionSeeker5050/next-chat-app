// import required models
import { UserModel } from '@/utils/models/user.model';

// the message model and it's crud operations
export interface MessageModel {
    sender: UserModel,
    content: string, // if it is an image or file, it should be a url which points to the file
    timestamp: Date,
    contentType: string, // text, image for the moment
}