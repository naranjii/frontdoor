// src/services/LogbookService.ts
import { z } from "zod";
import * as logbookRepository from "../repositories/logbookRepository";

const LogbookSchema = z.object({
  createdById: z.number(),
  guestId: z.string().uuid().optional(),
  patientId: z.string().uuid().optional(),
  checkOut: z.date().optional(),
});

export type LogbookInput = z.infer<typeof LogbookSchema>;

export class LogbookService {
  static async create(data: LogbookInput) {
    const parsed = LogbookSchema.parse(data);
    return logbookRepository.create(parsed);
  }

  static async getAll() {
    return logbookRepository.findAll();
  }

  static async getById(id: string) {
    return logbookRepository.findById(id);
  }

  static async update(id: string, data: Partial<LogbookInput>) {
    return logbookRepository.update(id, data);
  }

  static async remove(id: string) {
    return logbookRepository.remove(id);
  }
}
