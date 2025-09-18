import { Router, Request, Response } from 'express';
import { login, staffRegister } from '../controllers/staffController';
import { staffMiddleware } from '../middlewares/staffMiddleware';

const router = Router();
router.post('/register', staffMiddleware('ADMIN'), staffRegister)
router.post("/login", login)
// router.get ('/list', staffMiddleware('ADMIN'), staffList) - Admin Tools
export default router;
