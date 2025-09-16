import { prisma } from "../config/db";
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function register(name: string, email: string, UserRole, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, role, password: hashed }
  });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h"
  });
}
