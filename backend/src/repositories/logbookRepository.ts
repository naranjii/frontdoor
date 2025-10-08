import { prisma } from "../config/db";
import type { Prisma } from '../generated/prisma';

type CreateLogDTO = Prisma.LogbookCreateInput;
type UpdateLogDTO = Prisma.LogbookUpdateInput;

export async function create(data: CreateLogDTO) {
  return prisma.logbook.create({ data });
}

export async function findAll(filters?: { patientId?: string; guestId?: string }) {
  const where: any = {};
  if (filters?.patientId) where.patientId = filters.patientId;
  if (filters?.guestId) where.guestId = filters.guestId;
  return prisma.logbook.findMany({ where });
}

export async function findById(id: string) {
  return prisma.logbook.findUnique({ where: { id } });
}

export async function update(id: string, data: UpdateLogDTO) {
  return prisma.logbook.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.logbook.delete({ where: { id } });
}
