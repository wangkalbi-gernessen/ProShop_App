import mongoose, { model, Schema, ObjectId } from 'mongoose';

// Create an interface for Review
interface Review {
  name: string,
  rating: number, 
  comment: string,
}

// Create an interface for Product
interface Product {
  user: ObjectId,
  name: string,
  image: string, 
  brand: string,
  category: string,
  description: string,
  reviews: any,
  rating: number,
  numReviews: number, 
  price: number, 
  countInStock: number
}

// Create a Schema for Review 
const reviewSchema = new Schema<Review>({
  name: { type: String, required: true},
  rating: { type: Number, required: true},
  comment: { type: String, required: true},
}, {
  timestamps: true
})

// Create a Schema for Product
const productSchema = new Schema<Product>({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
}, {
  timestamps: true
})

// Create a Model 
const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;