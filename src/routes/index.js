import express from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import messageRoutes from './message';

const router = express.Router();

router.use('/auth', authRoutes);

// para poder acceder a los usuarios tiene que estar logueado
router.use('/users', usersRoutes);
// para poder enviar mensajes tiene que estar logueado
router.use('/messages', messageRoutes);

export default router;
