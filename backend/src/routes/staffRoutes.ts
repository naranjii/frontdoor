import { Router, Request, Response } from 'express';
import { login, register } from '../controllers/staffController';
import { staffMiddleware } from '../middlewares/staffMiddleware';

const router = Router();
router.post('/register', staffMiddleware('ADMIN'), register)
router.post("/login", login)
export default router;
