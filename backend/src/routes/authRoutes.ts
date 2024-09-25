import express from 'express';
import { login, googleAuth, protectedEndpoint } from '../controllers/authController';
import { checkRole } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/login', login);
router.get('/google', googleAuth);

router.get('/admin', checkRole('admin'), protectedEndpoint);
router.get('/customer', checkRole('customer'), protectedEndpoint);

export default router;
