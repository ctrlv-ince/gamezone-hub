const productService = require('../services/productService');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Product not found' || err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
};

const createProduct = async (req, res) => {
  try {
    const { images, ...productData } = req.body;
    const product = await productService.createProduct(productData, images || []);
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: 'No product IDs provided' });
    }
    await productService.deleteProducts(ids);
    res.json({ message: 'Products deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createProductReview = async (req, res) => {
  try {
    const { rating, comment, orderId } = req.body;
    const productId = req.params.id;
    const user = req.user;

    await productService.createProductReview(
      productId,
      user,
      rating,
      comment,
      orderId,
      user.username
    );

    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId, reviewId } = req.params;
    const userId = req.user._id;

    await productService.updateReview(
      productId,
      reviewId,
      userId,
      rating,
      comment,
      req.user.username
    );

    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id: productId, reviewId } = req.params;
    const userId = req.user._id;

    await productService.deleteReview(productId, reviewId, userId);

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const adminDeleteReview = async (req, res) => {
  try {
    const { id: productId, reviewId } = req.params;
    await productService.adminDeleteReview(productId, reviewId);
    res.json({ message: 'Review deleted successfully by admin' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProducts,
  createProductReview,
  updateReview,
  deleteReview,
  adminDeleteReview,
};