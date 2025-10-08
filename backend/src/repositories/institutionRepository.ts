import { prisma } from "../config/db";

export async function create(data: {institutionName: string}) {
  return prisma.institution.create({data: {institutionName: data.institutionName}});
}