import express, { Request, Response } from "express";
import 'colorts/lib/string';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config()
connectDB();

const app = express();

app.use(express.json());

app.get('/' , (req: Request, res: Response) => {
  res.send('API is running...');  
}); 

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});