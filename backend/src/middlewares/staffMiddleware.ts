import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../interfaces/JwtPayload';
import { StaffRequest } from '../interfaces/StaffRequest';

// Pending refactor: 'payload as JwtPayLoad' => StaffRequest

dotenv.config();
export const staffMiddleware = (requiredRole?: 'ADMIN') => {
  return (req: StaffRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.staff = payload;
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: 'Acesso limitado ao administrador' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
