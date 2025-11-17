const Product = require('../models/Product');
const Order = require('../models/Order');

const getProducts = async () => {
  const products = await Product.find({}).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username',
    },
  });
  return products;
};

const getProduct = async (productId) => {
  const product = await Product.findById(productId).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username',
    },
  });
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
  orderId,
  name
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
      name,
      rating: Number(rating),
      comment,
      user: user._id,
      order: orderId,
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
const updateReview = async (
  productId,
  reviewId,
  userId,
  rating,
  comment,
  username
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const review = product.reviews.id(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error('User not authorized to update this review');
  }

  review.rating = rating;
  review.comment = comment;
  review.name = username;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  return product;
};

const deleteReview = async (productId, reviewId, userId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const review = product.reviews.id(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error('User not authorized to delete this review');
  }

  const order = await Order.findById(review.order);

  if (order) {
    const orderItem = order.orderItems.find(
      (item) => item.product.toString() === productId
    );

    if (orderItem) {
      orderItem.isReviewed = false;
      await order.save();
    }
  }

  product.reviews.pull(reviewId);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      : 0;

  await product.save();
  return product;
};

const adminDeleteReview = async (productId, reviewId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const review = product.reviews.id(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  const order = await Order.findById(review.order);

  if (order) {
    const orderItem = order.orderItems.find(
      (item) => item.product.toString() === productId
    );

    if (orderItem) {
      orderItem.isReviewed = false;
      await order.save();
    }
  }

  product.reviews.pull(reviewId);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      : 0;

  await product.save();
  return product;
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProducts,
  createProductReview,
  updateReview,
  deleteReview,
  adminDeleteReview,
};