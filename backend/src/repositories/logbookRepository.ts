import { prisma } from "../config/db";
import { Logbook } from "@prisma/client";

interface CreateLogDTO {
  createdById: number;
  guestId?: string;
  patientId?: string;
  checkOut?: Date;
}

interface UpdateLogDTO {
  checkOut?: Date;
}

export const LogbookRepository = {
  async create(data: CreateLogDTO) {
    return prisma.logbook.create({ data });
  },

  async findAll(filters?: { patientId?: string; guestId?: string }) {
    const where: any = {};
    if (filters?.patientId) where.patientId = filters.patientId;
    if (filters?.guestId) where.guestId = filters.guestId;
    return prisma.logbook.findMany({ where });
  },

  async findById(id: string) {
    return prisma.logbook.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateLogDTO) {
    return prisma.logbook.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.logbook.delete({ where: { id } });
  },
};
