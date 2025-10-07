import { Router } from "express";
import { LogbookController } from "../controllers/LogbookController";
import { staffMiddleware } from "../middlewares/staffMiddleware";

const router = Router();

// Create Logbook entry
router.post("/", staffMiddleware(), LogbookController.create);

// List all Logbook entries
router.get("/", staffMiddleware(), LogbookController.getAll);

// Get Logbook entry by ID
router.get("/:id", staffMiddleware(), LogbookController.getById);

// Update Logbook entry
router.put("/:id", staffMiddleware(), LogbookController.update);

// Delete Logbook entry
router.delete("/:id", staffMiddleware(), LogbookController.remove);

export default router;
