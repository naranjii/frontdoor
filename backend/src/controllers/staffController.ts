import { Request, Response } from "express";
import * as StaffService from "../services/StaffService";

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  try {
    const user = await StaffService.register(name, email, password, role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await StaffService.login(email, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
