import { StaffJwtPayload } from '../middlewares/staffMiddleware'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}