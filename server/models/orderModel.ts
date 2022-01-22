import mongoose, { Types, model, Schema } from 'mongoose';

// Create an interface for Order
interface Order {
  user: Types.ObjectId,
  orderItems: any,
  shippingAddress: any, 
  paymentMethod: string,
  paymentResult: any,
  taxPrice: number,
  shippingPrice: number,
  totalPrice: number,
  isPaid: boolean,
  paidAt: Date,
  isDelivered: boolean
  deliveredAt: Date,
}

// Create a Schema for Order 
const orderSchema = new Schema<Order>({
  user: { type: Types.ObjectId, required: true, ref: 'User'},
  orderItems: [
    {
      name: { type: String, required: true},
      quantity: {type: Number, required: true},
      image: {type: String, required: true},
      price: {type: Number, required: true},
      product: {type: Types.ObjectId, required: true, ref: 'Product'},
    }
  ],
  shippingAddress: { 
    address: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: { type: String, required: true},
    country: { type: String, required: true},
  },
  paymentMethod: { type: String, required: true},
  paymentResult: { 
    id: { type: String},
    status: { type: String},
    update_time: { type: String},
    email_address: { type: String},
  },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false }, 
  deliveredAt: { type: Date }
}, {
  timestamps: true
})

// Create a Model 
const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;  