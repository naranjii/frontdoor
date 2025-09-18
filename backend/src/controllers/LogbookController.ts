// src/controllers/LogbookController.ts
import { Request, Response } from "express";
import { LogbookService } from "../services/LogbookService";

export class LogbookController {
  static async create(req: Request, res: Response) {
    try {
      const log = await LogbookService.create(req.body);
      res.status(201).json(log);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async getAll(_req: Request, res: Response) {
    const logs = await LogbookService.getAll();
    res.json(logs);
  }

  static async getById(req: Request, res: Response) {
    const log = await LogbookService.getById(req.params.id);
    if (!log) return res.status(404).json({ message: "Logbook entry not found" });
    res.json(log);
  }

  static async update(req: Request, res: Response) {
    const log = await LogbookService.update(req.params.id, req.body);
    res.json(log);
  }

  static async remove(req: Request, res: Response) {
    await LogbookService.remove(req.params.id);
    res.status(204).send();
  }
}
