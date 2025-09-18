import { Router } from 'express';
import { staffMiddleware } from '../middlewares/staffMiddleware';

const router = Router();
router.use(staffMiddleware())
router.get('/', listPatient)
router.get('/:id', infoPatient)
router.post('/', createPatient)
router.put('/:id', staffMiddleware('ADMIN'), updatePatient)
router.delete('/:id', staffMiddleware('ADMIN'), deletePatient)
export default router;