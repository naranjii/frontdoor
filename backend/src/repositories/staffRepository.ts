import { prisma } from "../config/db";
import { Staff, StaffRole } from "../generated/prisma";

interface CreateStaffDTO {
  name: string;
  hashedPassword: string;
  role: StaffRole;
}

export const StaffRepository = {
  async create({ name, hashedPassword, role }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
    const staff = await prisma.staff.create({
      data: { name, password: hashedPassword, role },
    });
    const { password, ...result } = staff;
    return result;
  },

  async findAll(){
    return prisma.staff.findMany();
  },


  async findByName(name: string) {
    return prisma.staff.findUnique({ where: { name } });
  },

  async findById(id: number) {
    return prisma.staff.findUnique({ where: { id } });
  },

  async delete(id: number) {
    return prisma.staff.delete({ where: { id } });
  },
};
