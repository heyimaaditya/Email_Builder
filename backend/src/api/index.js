import express from 'express';
import authRoutes from './auth.router.js';
import flowRoutes from './flows.router.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/flows', flowRoutes);

export default router;