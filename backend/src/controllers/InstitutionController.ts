import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstitutionController {
  static async registerInstitution(req: Request, res: Response) {
    const { institutionName } = req.body;
    try {
      const institution = await InstitutionService.register({ institutionName });
      res.status(201).json(institution);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}