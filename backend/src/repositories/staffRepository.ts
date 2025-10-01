import { prisma } from "../config/db";
import { Staff, StaffRole } from "../generated/prisma";

interface CreateStaffDTO {
  institutionName: string;
  username: string;
  name: string;
  hashedPassword: string;
  role: StaffRole;
}

export const StaffRepository = {

  async create({ institutionName, username, name, hashedPassword, role }: CreateStaffDTO): Promise<Omit<Staff, "password">> {
    const institution = await prisma.institution.findFirst({ where: { institutionName } });
    if (!institution) {
      throw new Error("Institution not found");
    }

    const staff = await prisma.staff.create({
      data: {
        institution: {
          connect: {
            id: institution.id,
            institutionName: institution.institutionName,
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
  },

  async findAll(){
    return prisma.staff.findMany();
  },


  async findByUsername(username: string) {
    return prisma.staff.findUnique({ where: { username } });
  },

  async findById(id: string) {
    return prisma.staff.findUnique({ where: { id } });
  },

  async delete(id: string) {
    return prisma.staff.delete({ where: { id } });
  },
};
