// src/controllers/GuestController.ts
import { Request, Response } from "express";
import { GuestService } from "../services/GuestService";

export class GuestController {
  static async create(req: Request, res: Response) {
    try {
      const guest = await GuestService.create(req.body);
      res.status(201).json(guest);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async getAll(_req: Request, res: Response) {
    const guests = await GuestService.getAll();
    res.json(guests);
  }

  static async getById(req: Request, res: Response) {
    const guest = await GuestService.getById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  }

  static async update(req: Request, res: Response) {
    const guest = await GuestService.update(req.params.id, req.body);
    res.json(guest);
  }

  static async remove(req: Request, res: Response) {
    await GuestService.remove(req.params.id);
    res.status(204).send();
  }
}
