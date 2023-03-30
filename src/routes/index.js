import express from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import messageRoutes from './message';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/messages', messageRoutes);

export default router;
