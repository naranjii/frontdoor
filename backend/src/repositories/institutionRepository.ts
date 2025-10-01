import { prisma } from "../config/db";

export const InstitutionRepository = {
  async create(data: {institutionName: string}) {
    return prisma.institution.create({data: {institutionName: data.institutionName}});
  }
}