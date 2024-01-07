// an api handler to set (just POST) author name, we will use the UserModel for this in the utils 

import { createUser, UserModel, UserProvider } from '@/utils/models/User.model';
import type { NextApiRequest, NextApiResponse } from 'next'


// import the mongodb client connect function
import { connect } from '@/utils/mongoDbDriver';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';

interface ResponseBody {
    error?: string;
    user?: UserModel;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseBody>
) {
    if (req.method === 'POST') {
        const { username } = req.body;

        // connect to the database using the connect function
        let { db, client } = await connect();

        try {

            const user = await createUser(username, UserProvider.DUMMY_USER, client, db);
            
            // close the database connection
            await client.close();
            
            res.status(200).json({ user: user });
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
        return;
    } else {
        // return method not allowed
        res.status(405).end();
        return;
    }


}