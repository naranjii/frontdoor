import { Request } from 'express';
import { JwtPayload } from "jsonwebtoken";

export interface StaffRequest extends Request {
  staff?: JwtPayload; // optional property to attach the JWT payload
}