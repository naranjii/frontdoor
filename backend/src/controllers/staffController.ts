import { Request, Response } from "express";
import * as StaffService from "../services/StaffService";

export async function register(req: Request, res: Response) {
  const { data } = req.body;
  try {
    const staff = await StaffService.register(data);
    res.status(201).json(staff);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { name, password } = req.body;
  try {
    const token = await StaffService.login(name, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
