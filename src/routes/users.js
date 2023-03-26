import express from 'express';
import userControllers from '../controllers/users';

const router = express.Router();

router
  .put('/setAvatar/:id', userControllers.setAvatar)
  .get('/allUsers/:id', userControllers.getAllUsers);

export default router;
