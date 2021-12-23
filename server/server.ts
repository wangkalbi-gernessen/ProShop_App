import { Request, Response } from "express";
import { products } from './data/products';

// const products = require('data/products.ts');
const express = require('express');

const app = express();

app.get('/' , (req: Request, res: Response) => {
  res.send('API is running...');  
}); 

app.get('/api/products' , (req: Request, res: Response) => {
  res.json(products);
}); 

app.listen(5000, console.log('Server running on port 5000'));