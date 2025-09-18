import { prisma } from "../config/db";
import { Guest } from "@prisma/client";

interface CreateGuestDTO {
  createdById: number;
  checked?: boolean;
}

interface UpdateGuestDTO {
  checked?: boolean;
}

export const GuestRepository = {
  async create(data: CreateGuestDTO) {
    return prisma.guest.create({ data });
  },

  async findAll(filters?: { checked?: boolean }) {
    const where: any = {};
    if (filters?.checked !== undefined) where.checked = filters.checked;
    return prisma.guest.findMany({ where });
  },

  async findById(id: string) {
    return prisma.guest.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateGuestDTO) {
    return prisma.guest.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.guest.delete({ where: { id } });
  },
};
