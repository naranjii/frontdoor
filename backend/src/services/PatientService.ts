// src/services/PatientService.ts
import { z } from "zod";
import * as patientRepository from "../repositories/patientRepository";

const PatientSchema = z.object({
  patientCode: z.number(),
  supportLevel: z.number(),
  driveLink: z.string().url().optional(),
  createdById: z.number(),
  checked: z.boolean().optional(),
});

export type PatientInput = z.infer<typeof PatientSchema>;

export class PatientService {
  static async create(data: PatientInput) {
    const parsed = PatientSchema.parse(data);
    return patientRepository.create(parsed);
  }

  static async getAll(filters?: Partial<PatientInput>) {
    return patientRepository.findAll(filters);
  }

  static async getById(id: string) {
    return patientRepository.findById(id);
  }

  static async update(id: string, data: Partial<PatientInput>) {
    return patientRepository.update(id, data);
  }

  static async remove(id: string) {
    return patientRepository.remove(id);
  }
}
