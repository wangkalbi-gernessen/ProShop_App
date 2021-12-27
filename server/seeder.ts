import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colorts/lib/string';
import users from './data/users';
import { products } from './data/products';
import UserModel from './models/userModel';
import ProductModel from './models/productModel';
import OrderModel from './models/orderModel';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

const importData =async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {...product, user: adminUser }
    });

    await ProductModel.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error)}`.red.inverse);
    process.exit(1);
  }
}

const destroyData =async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error)}`.red.inverse);
    process.exit(1);
  }
}

if(process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}