import { prisma } from "../config/db";
import { Guest } from "../generated/prisma";

interface CreateGuestDTO {
  createdById: number;
  checked?: boolean;
}

interface UpdateGuestDTO {
  checked?: boolean;
}

export async function create(data: CreateGuestDTO) {
  return prisma.guest.create({ data });
}

export async function findAll(filters?: { checked?: boolean }) {
  const where: any = {};
  if (filters?.checked !== undefined) where.checked = filters.checked;
  return prisma.guest.findMany({ where });
}

export async function findById(id: string) {
  return prisma.guest.findUnique({ where: { id } });
}

export async function update(id: string, data: UpdateGuestDTO) {
  return prisma.guest.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.guest.delete({ where: { id } });
}
