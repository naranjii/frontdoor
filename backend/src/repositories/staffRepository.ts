import { prisma } from "../config/db";

export const StaffRepository = {
	async create({ name, hashedPassword }: { name: string; hashedPassword: string }) {
		return prisma.staff.create({
			data: { name, password: hashedPassword },
			select: { id: true, name: true, role: true, createdAt: true },
		});
	},

	async findByName(name: string) {
		return prisma.staff.findUnique({ where: { name } });
	},
};