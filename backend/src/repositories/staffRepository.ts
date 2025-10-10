import { prisma } from "../config/db";
import { Staff, StaffRole } from "../generated/prisma";

interface CreateStaffDTO {
  institution: string;
  username: string;
  name: string;
  hashedPassword: string;
  role: StaffRole;
}

export async function create({ institution, username, name, hashedPassword, role }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
  const staffInstitution = await prisma.institution.findFirst({ where: { institutionName: institution } });
  if (!staffInstitution) {
    throw new Error("Institution not found");
  }

  const staff = await prisma.staff.create({
    data: {
      institution: {
        connect: {
          id: staffInstitution.id,
          institutionName: staffInstitution.institutionName,
        },
      },
      username,
      name,
      password: hashedPassword,
      role,
    },
  });
  const { password, ...result } = staff;
  return result;
}

export async function update(id: string, data: { name?: string; role?: StaffRole; isActive?: boolean }): Promise<Omit<Staff, "password">> {
  const staff = await prisma.staff.update({
    where: { id },
    data,
  });
  const { password, ...result } = staff;
  return result;
}

export async function findAll(){
  return prisma.staff.findMany();
}

export async function findByUsername(username: string) {
  return prisma.staff.findUnique({ where: { username } });
}

export async function findById(id: string) {
  return prisma.staff.findUnique({ where: { id } });
}

export async function remove(id: string) {
  return prisma.staff.delete({ where: { id } });
}
