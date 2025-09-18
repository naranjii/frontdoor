import { Router } from 'express';
import { StaffController } from '../controllers/StaffController';
import { staffMiddleware } from '../middlewares/staffMiddleware';

const router = Router();
router.get ('/list', staffMiddleware('ADMIN'), StaffController.list)
router.post('/register', staffMiddleware('ADMIN'), StaffController.registerStaff)
router.post("/login", StaffController.login)
export default router;
