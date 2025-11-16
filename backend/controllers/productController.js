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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};