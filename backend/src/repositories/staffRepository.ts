import { prisma } from "../config/db";
import { Staff } from "../generated/prisma";

interface CreateStaffDTO {
  name: string;
  hashedPassword: string;
}

export const StaffRepository = {
  async create({ name, hashedPassword }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
    const staff = await prisma.staff.create({
      data: { name, password: hashedPassword },
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
