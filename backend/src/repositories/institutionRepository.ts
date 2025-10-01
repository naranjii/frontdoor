import { prisma } from "../config/db";

export const InstitutionRepository = {
  async create(data: {name: string}) {
    return prisma.institution.create({data: {name: data.name}});
  }
}