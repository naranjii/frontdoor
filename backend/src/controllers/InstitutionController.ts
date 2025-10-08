import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstitutionController {
  static async registerInstitution(req: Request, res: Response) {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }

    const { institutionName } = req.body as { institutionName?: string };
    if (!institutionName) {
      return res.status(400).json({ error: 'institutionName is required' });
    }

    try {
      const institution = await InstitutionService.register({ institutionName });
      res.status(201).json(institution);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}