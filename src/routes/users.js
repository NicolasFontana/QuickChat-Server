import express from 'express';
import userControllers from '../controllers/users';

const router = express.Router();

router
  .post('/register', userControllers.createUser)
  .post('/login', userControllers.getUser)
  .put('/setAvatar/:id', userControllers.setAvatar);

export default router;
