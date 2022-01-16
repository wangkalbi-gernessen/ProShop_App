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
  const order: any = await OrderModel.findById(req.params.id).populate('user', 'name email');

  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order: any = await OrderModel.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders: any = await OrderModel.findById({ user: (req.user as any)._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }; 