const { Product } = require("../../models/products");

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const createOne = async (req, res) => {
  try {
    const bodyData = req.body;


    if (!bodyData.title || !bodyData.price || !bodyData.description) {
      return res.status(400).json({
        msg: "Title, price, and description are required",
      });
    }

    const newProduct = new Product({
      title: bodyData.title,
      price: bodyData.price,
      description: bodyData.description,
    });

    await newProduct.save();

    return res.status(201).json({
      msg: "Product Created",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const bodyData = req.body;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

   
    product.title = bodyData.title || product.title;
    product.price = bodyData.price || product.price;
    product.description = bodyData.description || product.description;

    await product.save();

    return res.json({
      msg: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deleteOne = async (req, res) => {
  try {
    const productId = req.params.id;

 
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.json({
      msg: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, createOne, getOne, updateOne, deleteOne };
