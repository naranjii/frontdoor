import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { StaffRepository } from "../repositories/staffRepository";
import { error } from "console";
import { hashPassword } from "../utils/password";

export async function register(data: any) {
	const { name, password } = data;
	const staff = await StaffRepository.findByName(name);
	if (staff) throw error("Name already in use");
	const hashed = await hashPassword(password);
	return StaffRepository.create({
		name,
		hashedPassword: hashed,
	});
}

export async function login(name: string, password: string) {
	const staff = await StaffRepository.findByName(name);
	if (!staff) throw error("Nome de usuário ou senha inválido");
	const valid = await bcrypt.compare(password, staff.password);
	if (!valid) throw error("Nome de usuário ou senha inválido");
	return jwt.sign(
		{ id: staff.id, role: staff.role },
		process.env.JWT_SECRET || "secret",
		{
			expiresIn: "1h",
		},
	);
}