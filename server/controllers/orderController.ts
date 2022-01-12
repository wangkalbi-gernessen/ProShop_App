import { Request, Response } from "express";
import OrderModel from "../models/orderModel";
import asyncHandler from 'express-async-handler';

// @desc Create new order
// @route Post /api/products
// @access Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order: any = new OrderModel({
      orderItems,
      user:  (req.user as any)._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems }; 