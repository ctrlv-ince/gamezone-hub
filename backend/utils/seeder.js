import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product from '../models/Product.js';

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

const importData = async () => {
  try {
    await Product.deleteMany();

    const products = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'backend', 'data', 'products.json'), 'utf-8')
    );

    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  if (process.argv === '-d') {
    await deleteData();
  } else {
    await importData();
  }
};

run();