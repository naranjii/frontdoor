import { Request, Response } from "express";
import * as StaffService from "../services/StaffService";

export class StaffController {
  static async registerStaff(req: Request, res: Response) {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const { institution, username, name, password, role } = req.body as {
      institution?: string;
      username?: string;
      name?: string;
      password?: string;
      role?: string;
    };

    if (!institution || !username || !name || !password || !role) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const staff = await StaffService.register({ institution, username, name, password, role: role as any });
      res.status(201).json(staff);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Nome de usuário e senha são obrigatórios" });
    }
    const { username, password } = req.body;
    try {
      const token = await StaffService.login(username, password);
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const staffId = req.params.id;
    if (!staffId) {
      return res.status(400).json({ error: 'Staff ID is required' });
    }
    const { name, role, isActive } = req.body as {
      name?: string;
      role?: string;
      isActive?: boolean;
    };
    if (!name && !role && typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'At least one field (name, role, isActive) is required to update' });
    }
    try {
      const updatedStaff = await StaffService.update(staffId, { name, role: role as any, isActive });
      res.json(updatedStaff);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const data = await StaffService.list();
      res.json({ data });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

}
