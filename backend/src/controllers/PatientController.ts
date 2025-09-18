// src/controllers/PatientController.ts
import { Request, Response } from "express";
import { PatientService } from "../services/PatientService";

export class PatientController {
  static async create(req: Request, res: Response) {
    try {
      const patient = await PatientService.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const patients = await PatientService.getAll(req.query);
    res.json(patients);
  }

  static async getById(req: Request, res: Response) {
    const patient = await PatientService.getById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  }

  static async update(req: Request, res: Response) {
    const patient = await PatientService.update(req.params.id, req.body);
    res.json(patient);
  }

  static async remove(req: Request, res: Response) {
    await PatientService.remove(req.params.id);
    res.status(204).send();
  }
}
