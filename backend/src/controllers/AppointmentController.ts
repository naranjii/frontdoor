import { Request, Response } from "express";
import { AppointmentService } from "../services/AppointmentService";

export class AppointmentController {
  static async create(req: Request, res: Response) {
    try {
      const appt = await AppointmentService.create(req.body);
      res.status(201).json(appt);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async getAll(_req: Request, res: Response) {
    const appts = await AppointmentService.getAll();
    res.json(appts);
  }

  static async getById(req: Request, res: Response) {
    const appt = await AppointmentService.getById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.json(appt);
  }

  static async update(req: Request, res: Response) {
    const appt = await AppointmentService.update(req.params.id, req.body);
    res.json(appt);
  }

  static async remove(req: Request, res: Response) {
    await AppointmentService.remove(req.params.id);
    res.status(204).send();
  }
}
