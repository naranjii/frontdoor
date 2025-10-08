import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import * as StaffRepository from "../repositories/staffRepository";
import { error } from "console";
import { StaffRole } from '../generated/prisma';

export async function register({
	institutionName,
	username,
	name,
	password,
	role
}: {
	institutionName: string;
	username: string;
	name: string;
	password: string;
	role: StaffRole
}) {
	const hashedPassword = await bcrypt.hash(password, 10);
	return StaffRepository.create({ institutionName, username, name, hashedPassword, role });
}

export async function login(username: string, password: string) {
		const staff = await StaffRepository.findByUsername(username);
		if (!staff) throw new Error("Nome de usuário ou senha inválido");
		const valid = await bcrypt.compare(password, staff.password);
		if (!valid) throw new Error("Nome de usuário ou senha inválido");
		return jwt.sign(
		{ id: staff.id, name: staff.name, institution: staff.institutionName, role: staff.role },
		process.env.JWT_SECRET || "secret",
		{
			expiresIn: "1h",
		},
	);
}

export async function list() {
	return StaffRepository.findAll();
}
