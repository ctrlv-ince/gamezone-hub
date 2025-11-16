const Product = require('../models/Product');
const Order = require('../models/Order');

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

const createProductReview = async (
  productId,
  user,
  rating,
  comment,
  orderId
) => {
  const product = await Product.findById(productId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      throw new Error('Product already reviewed');
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const orderItem = order.orderItems.find(
      (item) => item.product.toString() === productId
    );

    if (orderItem) {
      orderItem.isReviewed = true;
      await order.save();
    } else {
      // Optionally, you could throw an error here if a review must always be tied to an orderItem
      // throw new Error('Product not found in order items');
      console.warn(`Product ${productId} not found in order ${orderId} items for review.`);
    }

    await product.save();
  } else {
    throw new Error('Product not found');
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProducts,
  createProductReview,
};