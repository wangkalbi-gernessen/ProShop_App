import mongoose, { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Create an interface
export interface User extends Document {
  name: string,
  email: string, 
  password: string,
  isAdmin: boolean,
}

// Create a Schema
export const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async(password: any, userPassword: any) => {
  const enteredPassword: string = password.toString();
  const storedPassword: string = userPassword.toString();

  return await bcrypt.compare(enteredPassword, storedPassword);
}

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) {
    next();
  }
  
  const salt: number = Number(bcrypt.genSalt(10));

  this.password = await bcrypt.hash(String(this.password), salt);
});

// Create a Model 
const UserModel = model<User>('User', userSchema);

export default UserModel;

function password(enteredPassword: any, password: any): any {
  throw new Error('Function not implemented.');
}
