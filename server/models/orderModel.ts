import mongoose, { model, Schema } from 'mongoose';

// Create an interface for Order
interface Order {
  user: mongoose.Schema.Types.ObjectId,
  orderItems: any,
  shippingAddress: any, 
  paymentMethod: string,
}

// Create a Schema for Order 
const orderSchema = new Schema<Order>({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  orderItems: [
    {
      name: { type: String, required: true},
      quantity: {type: Number, required: true},
      image: {type: String, required: true},
      price: {type: Number, required: true},
      product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
    }
  ],
  shippingAddress: { 
    address: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: { type: String, required: true},
    country: { type: String, required: true},
  },
  paymentMethod: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  paymentMethod: { type: String, required: true},
}, {
  timestamps: true
})

// Create a Model 
const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;