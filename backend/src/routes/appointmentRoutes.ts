import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { staffMiddleware } from "../middlewares/staffMiddleware";

const router = Router();

router.post("/", staffMiddleware(), AppointmentController.create);
router.get("/", staffMiddleware(), AppointmentController.getAll);
router.get("/:id", staffMiddleware(), AppointmentController.getById);
router.put("/:id", staffMiddleware(), AppointmentController.update);
router.delete("/:id", staffMiddleware(), AppointmentController.remove);
export default router;
