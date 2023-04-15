import express from 'express';
import userControllers from '../controllers/users';
import authUser from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/:id', authUser, userControllers.getUserById)
  .get('/allUsers/:id', userControllers.getAllUsers)
  .put('/setAvatar/:id', userControllers.setAvatar);

export default router;
