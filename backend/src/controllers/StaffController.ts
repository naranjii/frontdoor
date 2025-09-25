import { Request, Response } from "express";
import * as StaffService from "../services/StaffService";
import { StaffRepository } from "../repositories/staffRepository";

export class StaffController {
  static async registerStaff(req: Request, res: Response) {
    const { username, name, password, role } = req.body;
    try {
      const staff = await StaffService.register({username, name, password, role});
      res.status(201).json(staff);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const token = await StaffService.login(username, password);
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  static async list() {
    return StaffRepository.findAll()
  }

}
