const express = require("express");
const productController = require("../products/controller");
const { requireAuth } = require("../middlewara/auth");
const uploadImage = require("../middlewara/upload");

const router = express.Router();

// ✅ Create a new product (with image upload & user authentication)
router.post("/create", requireAuth, uploadImage, productController.createProduct);

// ✅ Get all products owned by the logged-in user
router.get("/getAll", requireAuth, productController.getMyProducts);

// ✅ Get, update, delete a product by its ID (only if owned by the user)
router.route("/:productId")
  .get(requireAuth, productController.getProductById)
  .put(requireAuth, uploadImage, productController.updateProduct)
  .delete(requireAuth, productController.deleteProduct);

module.exports = router;
