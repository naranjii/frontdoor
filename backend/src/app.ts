import express from "express";
import guestRoutes from "./routes/guestRoutes";
import patientRoutes from "./routes/patientRoutes";
import logbookRoutes from "./routes/logbookRoutes";
import staffRoutes from "./routes/staffRoutes";
import cors from "cors";
import institutionRoutes from "./routes/institutionRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Institution auth
app.use("/institution", institutionRoutes);

// Staff auth
app.use("/staff", staffRoutes);

// Guests
app.use("/guests", guestRoutes);

// Patients
app.use("/patients", patientRoutes);

// Logbook
app.use("/logbooks", logbookRoutes);

export default app;
