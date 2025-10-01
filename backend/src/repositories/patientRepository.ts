import { prisma } from "../config/db";

interface CreatePatientDTO {
  name: string
  patientCode: number;
  supportLevel: number;
  driveLink?: string;
  healthcare?: string;
  createdById: string;
}

interface UpdatePatientDTO {
  supportLevel?: number;
  driveLink?: string;
  checked?: boolean;
}

export const PatientRepository = {
  async create(data: CreatePatientDTO) {
    return prisma.patient.create({ data });
  },

  async findAll(filters?: { name?: string; supportLevel?: number }) {
    const where: any = {};
    if (filters?.supportLevel) where.supportLevel = filters.supportLevel;
    if (filters?.name) where.patientCode = Number(filters.name); // or another field
    return prisma.patient.findMany({ where });
  },

  async findById(id: string) {
    return prisma.patient.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdatePatientDTO) {
    return prisma.patient.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.patient.delete({ where: { id } });
  },
};
