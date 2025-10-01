import { Request, Response } from "express";
import * as StaffService from "../services/StaffService";

export class StaffController {
  static async registerStaff(req: Request, res: Response) {
    const { institutionName, username, name, password, role } = req.body;
    if (!institutionName || !username || !name || !password || !role) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    try {
      const staff = await StaffService.register({ institutionName, username, name, password, role});
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

  static async list(req: Request, res: Response) {
        try {
      const data = await StaffService.list();
      res.json({ data });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

}
