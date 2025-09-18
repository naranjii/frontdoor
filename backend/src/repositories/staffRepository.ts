import { prisma } from "../config/db";
import { Staff, StaffRole } from "@prisma/client";

interface CreateStaffDTO {
  name: string;
  hashedPassword: string;
  role?: StaffRole;
}

export const StaffRepository = {
  async create({ name, hashedPassword, role = "STAFF" }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
    const staff = await prisma.staff.create({
      data: { name, password: hashedPassword, role },
    });
    // Remove password from returned object
    const { password, ...result } = staff;
    return result;
  },

  async findByName(name: string) {
    return prisma.staff.findUnique({ where: { name } });
  },

  async findById(id: number) {
    return prisma.staff.findUnique({ where: { id } });
  },

  async update(id: number, data: Partial<Omit<Staff, "id" | "createdAt" | "updatedAt">>) {
    return prisma.staff.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.staff.delete({ where: { id } });
  },
};
