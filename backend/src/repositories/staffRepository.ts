import { Router, Request, Response } from 'express';

const router = Router();

// GET /staff
router.get('/', (req: Request, res: Response) => {
  res.send('List of staff');
});

// POST /staff
router.post('/', (req: Request, res: Response) => {
  res.send('Create staff member');
});

export default router;
