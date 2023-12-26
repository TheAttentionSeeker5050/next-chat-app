// import required models
import { UserModel } from '@/utils/models/user.model';

// the conversation model and crud operations
export interface ConversationModel {
    conversationId: string,
    participants: UserModel[],
    messages: string[],
    adminId: UserModel,
}