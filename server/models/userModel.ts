import mongoose, { model, Schema } from 'mongoose';

// Create an interface
interface User {
  name: string,
  email: string, 
  password: string,
  isAdmin: boolean
}

// Create a Schema
const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, {
  timestamps: true
})

// Create a Model 
const UserModel = model<User>('User', userSchema);

export default UserModel;