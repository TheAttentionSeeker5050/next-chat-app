// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// import mongo connect util driver
import { connect } from "@/utils/mongoDbDriver"
type HelloData = {
  name: string,
  dbIsOn: boolean

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloData>
) {

  
  try {
    // add db connect driver
    const db = await connect();
    
  } catch (error) {
    // if error, return error json
    res.status(500).json({ name: 'Hello World!', dbIsOn: false } );
  }
  
  // if no error, return success json
  res.status(200).json({ name: 'Hello World!', dbIsOn: true } );
  
}
