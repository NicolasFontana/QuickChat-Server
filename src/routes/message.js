import express from 'express';
import messageControllers from '../controllers/message';

const router = express.Router();

router
  .post('/getAllMessages', messageControllers.getAllMessages)
  .post('/addMessage', messageControllers.addMessage);

export default router;
