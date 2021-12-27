import express, { Request, Response } from "express";
import 'colorts/lib/string';
import { products } from './data/products';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config()
connectDB();

const app = express();

app.get('/' , (req: Request, res: Response) => {
  res.send('API is running...');  
}); 

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});