import { z } from "zod";
import * as appointmentRepository from "../repositories/appointmentRepository";

const AppointmentSchema = z.object({
  createdById: z.number(),
  patientId: z.string().uuid().optional(),
  guestId: z.string().uuid().optional(),
  scheduledAt: z.date().optional(),
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

