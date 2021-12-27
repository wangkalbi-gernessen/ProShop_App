import express, { Request, Response } from "express";
import ProductModel from "../models/productModel";
import asyncHandler from 'express-async-handler';

const router = express.Router();


// @desc Fetch all products
// @route Get /api/products
// @access Public
router.get('/' , asyncHandler(async(req: Request, res: Response) => {
  const products = await ProductModel.find({ })
  res.json(products);
}));

// @desc Fetch single product
// @route Get /api/products/:id
// @access Public
router.get('/:id' , asyncHandler(async(req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if(product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found'});
  }
})); 

export default router;