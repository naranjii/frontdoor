import { Router, Request, Response } from 'express';

const router = Router();

router.post("/login", staffController)
// POST /staff
router.post('/', (req: Request, res: Response) => {
  res.send('Create staff member');
});

export default router;
