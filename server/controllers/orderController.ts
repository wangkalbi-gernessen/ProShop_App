import { Request, Response } from "express";
import OrderModel from "../models/orderModel";
import asyncHandler from 'express-async-handler';

declare global {
  namespace Express {
    interface Request {
        user? : Record<string,any>
    }
  }
}

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

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order: any = await (await OrderModel.findById(req.params.id)).populate('user', 'name email');

  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById }; 