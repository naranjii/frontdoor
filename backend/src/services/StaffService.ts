import { prisma } from "../config/db";
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function register(name: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.staff.create({
    data: { name, password: hashed }
  });
}

export async function login(name: string, password: string) {
  const user = await prisma.staff.findUnique({ where: { name } });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h"
  });
}
