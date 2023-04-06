import express from 'express';
import authControllers from '../controllers/auth';
import createUserValidation from '../validation/user';

const router = express.Router();

router
  .post('/register', createUserValidation, authControllers.createUser)
  .post('/login', authControllers.getUser);

export default router;
