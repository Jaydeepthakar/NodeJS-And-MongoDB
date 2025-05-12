const { Product } = require("../products/model");  
const ObjectId = require("mongoose").Types.ObjectId; 



// Get all products  
const getAllProducts = async (req, res) => {  
  try {  
    const products = await Product.find().select("-__v");  
    return res.json({ success: true, data: products });  
  } catch (error) {  
    console.log(error);  
    return res.status(500).json({ success: false, msg: "Error retrieving products" });  
  }  
};  

// Get a single product by ID  
const getProductById = async (req, res) => {  
  try {  
    const { productId } = req.params;  

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, msg: "Invalid Product ID" });
    }

    const product = await Product.findById(productId).select("-__v");  

    if (!product) {  
      return res.status(404).json({ success: false, msg: "Product not found" });  
    }  

    return res.json({ success: true, data: product });  
  } catch (error) {  
    console.log(error);  
    return res.status(500).json({ success: false, msg: "Error retrieving product" });  
  }  
};  

// Create a new product  
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const images = req.file ? req.file.filename : "";

    if (!name || !price || !stock) {
      return res.status(400).json({ success: false, msg: "Name, price, and stock are required" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images, 
    });

    console.log(newProduct)


    return res.status(201).json({ success: true, msg: "Product created successfully", data: newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Error creating product" });
  }
};
// Update a product by ID  
const updateProduct = async (req, res) => {  
  try {  
    const { productId } = req.params;  

    if (!ObjectId.Types.ObjectId.isValid(productId)) {  
      return res.status(400).json({ success: false, msg: "Invalid Product ID" });  
    }  

    const updatedData = { ...req.body };  
    if (req.file) {  
      updatedData.images = req.file.filename;
    }  

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {  
      new: true,  
      runValidators: true,  
    }).select("-__v");  

    if (!updatedProduct) {  
      return res.status(404).json({ success: false, msg: "Product not found" });  
    }  

    return res.json({ success: true, msg: "Product updated successfully", data: updatedProduct });  
  } catch (error) {  
    console.log(error);  
    return res.status(500).json({ success: false, msg: "Error updating product" });  
  }  
};  

// Delete a product by ID  
const deleteProduct = async (req, res) => {  
  try {  
    const { productId } = req.params;  

    if (!ObjectId.Types.ObjectId.isValid(productId)) {  
      return res.status(400).json({ success: false, msg: "Invalid Product ID" });  
    }  

    const deletedProduct = await Product.findByIdAndDelete(productId);  

    if (!deletedProduct) {  
      return res.status(404).json({ success: false, msg: "Product not found" });  
    }  

    return res.json({ success: true, msg: "Product deleted successfully" });  
  } catch (error) {  
    console.log(error);  
    return res.status(500).json({ success: false, msg: "Error deleting product" });  
  }  
};  

module.exports = {  
  getAllProducts,  
  getProductById,  
  createProduct,  
  updateProduct,  
  deleteProduct,  
};  