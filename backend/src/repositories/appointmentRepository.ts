import { prisma } from "../config/db";
import type { Prisma } from '../generated/prisma';

type CreateAppointmentDTO = Prisma.AppointmentCreateInput;
type UpdateAppointmentDTO = Prisma.AppointmentUpdateInput;

export async function create(data: CreateAppointmentDTO) {
  return prisma.appointment.create({ data });
}

export async function findAll(filters?: { patientId?: string; guestId?: string }) {
  const where: any = {};
  if (filters?.patientId) where.patientId = filters.patientId;
  if (filters?.guestId) where.guestId = filters.guestId;
  return prisma.appointment.findMany({ where });
}

export async function findById(id: string) {
  return prisma.appointment.findUnique({ where: { id } });
}

export async function update(id: string, data: UpdateAppointmentDTO) {
  return prisma.appointment.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.appointment.delete({ where: { id } });
}

