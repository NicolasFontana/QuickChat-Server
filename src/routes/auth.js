import express from 'express';
import authControllers from '../controllers/auth';

const router = express.Router();

router
  .post('/register', authControllers.createUser)
  .post('/login', authControllers.getUser);

export default router;
