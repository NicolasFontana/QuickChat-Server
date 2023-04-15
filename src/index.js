import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
import app from './app';

dotenv.config();

const port = process.env.PORT;
const MONGODB_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URL, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Database error: ', error);
  } else {
    // eslint-disable-next-line no-console
    console.log('Database connected');
    const server = http.createServer(app);
    const httpServer = server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('App listening');
    });
    const io = new WebsocketServer(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });

    const onlineUsers = new Map();

    io.on('connection', (socket) => {
      socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
      });
      socket.on('send-msg', (data) => {
        const userSocket = onlineUsers.get(data.to);
        if (userSocket) {
          socket.to(userSocket).emit('msg-receive', ({ from: data.from, msg: data.message }));
        }
      });
    });
  }
});
