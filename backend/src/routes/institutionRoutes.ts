import { Router } from 'express';
import { InstitutionController } from '../controllers/InstitutionController';

const router = Router();
router.post('/register', InstitutionController.registerInstitution)
export default router;