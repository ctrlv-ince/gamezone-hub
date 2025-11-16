import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import User from '../models/User.js';

dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importAdmin = async () => {
  try {
    await User.deleteOne({ email: 'admin@gmail.com' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    console.log('Admin User Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await importAdmin();
};

run();
