// src/services/GuestService.ts
import { z } from "zod";
import * as guestRepository from "../repositories/guestRepository";

const GuestSchema = z.object({
  createdById: z.number(),
  checked: z.boolean().optional(),
});

export type GuestInput = z.infer<typeof GuestSchema>;

export class GuestService {
  static async create(data: GuestInput) {
    const parsed = GuestSchema.parse(data);
    return guestRepository.create(parsed as any);
  }

  static async getAll() {
    return guestRepository.findAll();
  }

  static async getById(id: string) {
    return guestRepository.findById(id);
  }

  static async update(id: string, data: Partial<GuestInput>) {
    return guestRepository.update(id, data);
  }

  static async remove(id: string) {
    return guestRepository.remove(id);
  }
}
