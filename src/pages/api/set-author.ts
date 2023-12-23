import type { NextApiRequest, NextApiResponse } from 'next'

// import mongo connect util driver
import { connect } from "@/utils/mongoDbDriver"

// the response data type interface
type HelloData = {
  username: string,
  socketId: string,
  
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HelloData>
  ) {};