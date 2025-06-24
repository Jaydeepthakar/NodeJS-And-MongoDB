const { Product } = require('../products/model');

// ✅ Create a product (for logged-in user only)
const createProduct = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const { name, description, price} = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      owner: req.session.user.id, // associate with user
    });

    return res.status(201).json({ success: true, msg: 'Product created', product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Failed to create product' });
  }
};

// ✅ Get all products of logged-in user
const getMyProducts = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    const products = await Product.find({ owner: req.session.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Error fetching products' });
  }
};

// ✅ Get one product (only if owned by logged-in user)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    if (product.owner.toString() !== req.session.user?.id) {
      return res.status(403).json({ success: false, msg: 'Access denied' });
    }

    return res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Error fetching product' });
  }
};

// ✅ Update product (only if owned by logged-in user)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    if (product.owner.toString() !== req.session.user?.id) {
      return res.status(403).json({ success: false, msg: 'Access denied' });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    return res.json({ success: true, msg: 'Product updated', data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Error updating product' });
  }
};

// ✅ Delete product (only if owned by logged-in user)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    if (product.owner.toString() !== req.session.user?.id) {
      return res.status(403).json({ success: false, msg: 'Access denied' });
    }

    await product.deleteOne();
    return res.json({ success: true, msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
