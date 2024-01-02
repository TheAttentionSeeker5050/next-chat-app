import firebase from '@/firebase';
import { MessageContentType } from '@/utils/models/Message.model';
import { getDatabase, push, ref, set } from 'firebase/database';
import type { NextApiRequest, NextApiResponse } from 'next'

// make interface for request body and response body
interface reqBody {
    message: string;
    authorId: string;
    author: string;
    conversationId?: string;
}

interface resBody {
    message?: string;
    author?: string;
    success: boolean;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<resBody>
) {
    if (req.method === 'POST') {

        // validate request body with our interface
        const body: reqBody = req.body;
        if (!body.message || !body.authorId || !body.author) {
            res.status(400).json({ success: false, error: 'Invalid request body' });
            return;
        }

        try {
        // add message to database
            addNewMessageToDatabase(body.message, body.author, body.authorId, body.conversationId);
        } catch (error) {
            res.status(500).json({ success: false, error: "Something went wrong while sending the message" });
            return;
        }
        

        res.status(200).json({ success: true});
        return;
    } else {
        // return method not allowed
        res.status(405).end();
        return;
    }

}

const addNewMessageToDatabase = (message: string, author: string, authorId: string, conversationId?: string) => {
    if (!conversationId) {
      conversationId = 'default';
    }

    // change to push instead of set an individual message
    const database = getDatabase(firebase);
    const messageListRef =ref(database, 'conversations/' + conversationId + '/messages/');
    const newMessageRef = push(messageListRef);
    set(newMessageRef, {
        message: message,
      userId: authorId,
      username: author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      contentType: MessageContentType.TEXT,
      _id: newMessageRef.key
    });
    
};