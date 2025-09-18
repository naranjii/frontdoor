import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import { staffMiddleware } from "../middlewares/staffMiddleware";

const router = Router();

// Create Patient
router.post("/", staffMiddleware(), PatientController.create);

// List Patients (supports filters via query params)
router.get("/", staffMiddleware(), PatientController.getAll);

// Get Patient by ID
router.get("/:id", staffMiddleware(), PatientController.getById);

// Update Patient
router.put("/:id", staffMiddleware(), PatientController.update);

// Delete Patient
router.delete("/:id", staffMiddleware(), PatientController.remove);

export default router;
