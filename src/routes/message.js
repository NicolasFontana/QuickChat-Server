import express from 'express';
import messageControllers from '../controllers/message';
import createMessageValidation from '../validation/message';

const router = express.Router();

router
  .post('/getAllMessages', messageControllers.getAllMessages)
  .post('/addMessage', createMessageValidation, messageControllers.addMessage);

export default router;
