const Product = require('../models/Product');

const getProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const createProduct = async (productData, imageUrls) => {
  const images = imageUrls.map((url) => {
    const public_id = url.split('/').pop().split('.')[0];
    return { public_id, url };
  });

  const product = new Product({
    ...productData,
    images,
  });
  await product.save();
  return product;
};

const updateProduct = async (productId, productData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    productData,
    { new: true }
  );
  return updatedProduct;
};

const deleteProducts = async (productIds) => {
  const result = await Product.deleteMany({ _id: { $in: productIds } });
  return result;
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProducts,
};