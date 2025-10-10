import { Router } from 'express';
import { StaffController } from '../controllers/StaffController';
import { staffMiddleware } from '../middlewares/staffMiddleware';

const router = Router();
router.get ('/', staffMiddleware('ADMIN'), StaffController.list)
router.post('/register', StaffController.registerStaff)
router.post("/login", StaffController.login)
router.put('/:id', staffMiddleware('ADMIN'), StaffController.update)
export default router;
