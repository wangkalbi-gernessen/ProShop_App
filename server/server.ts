import express, { Request, Response } from "express";
import 'colorts/lib/string';
import { products } from './data/products';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config()
connectDB();

const app = express();

app.get('/' , (req: Request, res: Response) => {
  res.send('API is running...');  
}); 

app.get('/api/products' , (req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id' , (req: Request, res: Response) => {
  const product = products.find((product: any) => product._id === req.params.id);
  res.json(product);
}); 

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});