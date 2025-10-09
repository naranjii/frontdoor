// src/services/PatientService.ts
import { z } from "zod";
import * as patientRepository from "../repositories/patientRepository";

const PatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0),
  healthcare: z.string().optional(),
  notes: z.string().optional(),
  patientCode: z.number().optional(),
  supportLevel: z.number().max(5).optional(),
  driveLink: z.string().optional(),
  createdById: z.string(),
  checked: z.boolean().optional(),
});

export type PatientInput = z.infer<typeof PatientSchema>;

export class PatientService {
  static async create(data: PatientInput) {
    const parsed = PatientSchema.parse(data);
    return patientRepository.create(parsed as any);
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
