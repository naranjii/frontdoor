import { Router } from "express";
import { GuestController } from "../controllers/GuestController";
import { staffMiddleware } from "../middlewares/staffMiddleware";

const router = Router();

// Create Guest
router.post("/", staffMiddleware(), GuestController.create);

// List all Guests
router.get("/", GuestController.getAll);

// Get Guest by ID
router.get("/:id", staffMiddleware(), GuestController.getById);

// Update Guest
router.put("/:id", staffMiddleware(), GuestController.update);

// Delete Guest
router.delete("/:id", staffMiddleware(), GuestController.remove);

export default router;
