import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import asyncHandler from 'express-async-handler';

// @desc Fetch all products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await ProductModel.find({ });
  res.json(products);
});

// @desc Fetch single product
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);

  if(product) {
    res.json(product);
  } else {
    res.status(404)
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById }