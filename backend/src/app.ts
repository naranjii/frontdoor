import express from 'express';
import staffRoutes from './routes/staffRoutes';

const app = express();
app.use(express.json());
app.use('/staff', staffRoutes);
app.use('/guest', staffRoutes);
app.use('/patient', staffRoutes);
app.use('/logbook', staffRoutes);

export default app;