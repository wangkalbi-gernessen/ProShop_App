import mongoose, { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Create an interface
export interface User extends mongoose.Document {
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
});

userSchema.methods.matchPassword = async(enteredPassword: any) => {
  let user: any = this;
  return  await bcrypt.compare(enteredPassword, user.password);
} 

userSchema.pre('save', async function(next){
  let user: any = this;
  if(!this.isModified('password')) {
    next();
  }

  const salt: any = bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Create a Model 
const UserModel = model<User>('User', userSchema);

export default UserModel;