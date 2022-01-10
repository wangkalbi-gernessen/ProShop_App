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

userSchema.methods.matchPassword = async(password: any) => {
  let user: any = this;
  // return await bcrypt.compare(enteredPassword, user.password);
  const enteredPassword: string = password.toString();
  const passwordBd: string = user.password;

  let isValid = await bcrypt.compare(enteredPassword, "123456");
  if((typeof isValid) === "string") {
    return true;
  } else {
    return false;
  }
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

function password(enteredPassword: any, password: any): any {
  throw new Error('Function not implemented.');
}
