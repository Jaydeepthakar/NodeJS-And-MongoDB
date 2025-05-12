const express = require("express");
const product = require("../products/controller"); 
const { requireAuth } = require("../middlewara/auth"); 
const uploadImage = require("../middlewara/upload");

const router = express.Router();


router.post("/create", uploadImage,product.createProduct);


router.get("/", requireAuth, product.getAllProducts);

router.route("/:productId")
  .get(product.getProductById)
  .put(requireAuth,uploadImage, product.updateProduct)
  .delete(requireAuth,uploadImage, product.deleteProduct);

module.exports = router;
