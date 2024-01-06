// an api handler to set (just POST) author name, we will use the UserModel for this in the utils 

import { createUser, UserModel } from '@/utils/models/User.model';
import type { NextApiRequest, NextApiResponse } from 'next'


// import the mongodb client connect function
import { connect } from '@/utils/mongoDbDriver';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserModel>
) {
    if (req.method === 'POST') {
        const { username } = req.body;

        // connect to the database using the connect function
        let { db, client } = await connect();

        const user = await createUser(username, client, db);

        // close the database connection
        await client.close();

        res.status(200).json(user);
        return;
    } else {
        // return method not allowed
        res.status(405).end();
        return;
    }


}