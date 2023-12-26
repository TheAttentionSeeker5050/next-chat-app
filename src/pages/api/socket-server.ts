// socket-server.ts
import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ioHandler (req: NextApiRequest, res: NextApiResponse) {
    // use ? operator to check if socket.server.io is defined
if (!req.socket.server.io) {
    console.log('Setting up Socket.IO');
    const io = new Server(req.socket.server); // Cast req.socket.server to 'any' type

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    req.socket.server.io = io;
}

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

