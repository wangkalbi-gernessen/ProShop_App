import mongoose from 'mongoose';
import 'colorts/lib/string';

const connectDB =async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI  as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`.red.underline.bold);
    process.exit(1);
  }
}

export { connectDB };