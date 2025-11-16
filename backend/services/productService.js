const Product = require('../models/Product');

const getProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProduct = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};