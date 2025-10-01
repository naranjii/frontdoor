import { prisma } from "../config/db";
import { Staff, StaffRole } from "../generated/prisma";

interface CreateStaffDTO {
  institution: string
  username: string;
  name: string;
  hashedPassword: string;
  role: StaffRole;
}

export const StaffRepository = {
  async create({ institution, username, name, hashedPassword, role }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
    const staff = await prisma.staff.create({
      data: { institution, username, name, password: hashedPassword, role },
    });
    const { password, ...result } = staff;
    return result;
  },

  async findAll(){
    return prisma.staff.findMany();
  },


  async findByUsername(username: string) {
    return prisma.staff.findUnique({ where: { username } });
  },

  async findById(id: number) {
    return prisma.staff.findUnique({ where: { id } });
  },

  async delete(id: number) {
    return prisma.staff.delete({ where: { id } });
  },
};
