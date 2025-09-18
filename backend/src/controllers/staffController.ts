import { Request, Response } from "express";
import { z } from "zod";
import * as StaffService from "../services/StaffService";

// 📌 DTOs com Zod
const registerSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(6),
  role: z.enum(["STAFF", "ADMIN"]).default("STAFF"),
});

const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

// 📌 Controller
export async function registerStaff(req: Request, res: Response) {
  try {
    const parsed = registerSchema.parse(req.body);
    const staff = await StaffService.register(parsed);
    res.status(201).json(staff);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: "Erro ao registrar staff" });
  }
}

export async function loginStaff(req: Request, res: Response) {
  try {
    const parsed = loginSchema.parse(req.body);
    const token = await StaffService.login(parsed);
    res.status(200).json({ token });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    if (err.message === "Credenciais inválidas") {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    console.error(err);
    res.status(500).json({ message: "Erro ao autenticar staff" });
  }
}

export async function listStaff(req: Request, res: Response) {
  try {
    const staff = await StaffService.list();
    res.status(200).json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar staff" });
  }
}
