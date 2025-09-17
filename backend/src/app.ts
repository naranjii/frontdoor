import express from 'express';
import staffRoutes from './routes/staffRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/staff', staffRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
