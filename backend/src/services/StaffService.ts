import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { StaffRepository } from "../repositories/staffRepository";
import { error } from "console";
import { StaffRole } from '../generated/prisma';

export async function register({
  username,
  name,
  password,
  role
}: {
  username: string;
  name: string;
  password: string;
  role: StaffRole
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return StaffRepository.create({ username, name, hashedPassword, role });
}

export async function login(username: string, password: string) {
	const staff = await StaffRepository.findByUsername(username);
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