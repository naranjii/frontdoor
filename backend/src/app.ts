import express from 'express';
import staffRoutes from './routes/staffRoutes';

const app = express();
app.use(express.json());
app.use('/staff', staffRoutes);
app.use('/guest', guestRoutes);
app.use('/patient', patientRoutes);
app.use('/logbook', logbookRoutes);

export default app;