
import { prisma } from "../config/db";
import type { Prisma } from '../generated/prisma';

type CreatePatientDTO = Prisma.PatientCreateInput;
type UpdatePatientDTO = Prisma.PatientUpdateInput;

export async function create(data: CreatePatientDTO) {
  return prisma.patient.create({ data });
}

export async function findAll(filters?: { name?: string; supportLevel?: number }) {
  const where: any = {};
  if (filters?.supportLevel) where.supportLevel = filters.supportLevel;
  if (filters?.name) where.patientCode = Number(filters.name); // or another field
  return prisma.patient.findMany({ where });
}

export async function findById(id: string) {
  return prisma.patient.findUnique({ where: { id } });
}

export async function update(id: string, data: UpdatePatientDTO) {
  return prisma.patient.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.patient.delete({ where: { id } });
}
