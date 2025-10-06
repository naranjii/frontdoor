import express from "express";
import guestRoutes from "./routes/guestRoutes";
import patientRoutes from "./routes/patientRoutes";
import logbookRoutes from "./routes/logbookRoutes";
import staffRoutes from "./routes/staffRoutes";
import cors from "cors";
import institutionRoutes from "./routes/institutionRoutes";
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "https://extramural-holoblastic-nora.ngrok-free.dev"],
};
app.use(cors(corsOptions));
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

app.use('/', createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
}));

export default app;
