import express, { Request, Response } from 'express';
import appointmentRoutes from './routes/appointmentRoutes';
import buyersRoute from './routes/buyersRoute';
import vendorsRoute from './routes/vendorsRoute';
import cors from 'cors';

const app = express()
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(appointmentRoutes)
app.use(vendorsRoute);
app.use(buyersRoute);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});