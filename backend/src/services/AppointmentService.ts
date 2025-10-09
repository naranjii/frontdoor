import { z } from "zod";
import * as appointmentRepository from "../repositories/appointmentRepository";
import { notDeepEqual } from "assert";

const AppointmentSchema = z.object({
  createdById: z.string(),
  patientId: z.string().uuid().optional(),
  guestId: z.string().uuid().optional(),
  appointmentAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional()
  ),
  therapist: z.string().optional(),
  notes: z.string().optional()
  });

export type AppointmentInput = z.infer<typeof AppointmentSchema>;

export class AppointmentService {
  static async create(data: AppointmentInput) {
    const parsed = AppointmentSchema.parse(data);
    return appointmentRepository.create(parsed as any);
  }

  static async getAll() {
    return appointmentRepository.findAll();
  }

  static async getById(id: string) {
    return appointmentRepository.findById(id);
  }

  static async update(id: string, data: Partial<AppointmentInput>) {
    return appointmentRepository.update(id, data as any);
  }

  static async remove(id: string) {
    return appointmentRepository.remove(id);
  }
}

