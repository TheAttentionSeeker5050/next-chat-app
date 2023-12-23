

// create mongo model definition, it consist of 2 parts:    
// username: string,
// socketId: string, this should be unique and convertable to uuid


// the other model is the conversation thread model, it consist of 3 parts:
// conversationId: string,
// participants: string[],
// messages: string[]
// adminId: string, if user is admin, he can delete the conversation thread, add new participants, and delete participants

// define the model document data definitions
export interface ConversationModel {
  conversationId: string,
  participants: UserModel[],
  messages: string[],
  adminId: UserModel,
}

export interface UserModel {
    username: string,
    socketId: string,
}

export interface MessageModel {
    sender: UserModel,
    content: string,
    timestamp: Date,
    contentType: string, // text, image for the moment
}






