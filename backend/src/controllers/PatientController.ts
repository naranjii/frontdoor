import { Request, Response } from "express";
export async function registerStaff(req: Request, res: Response) {
  const { data } = req.body;
  try {
    const staff = await StaffService.register(data);
    res.status(201).json(staff);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

