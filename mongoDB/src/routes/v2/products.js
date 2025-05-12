const express = require("express");
const product = require("../../controllers/v2/products");

const route = express.Router();

route.get("/", product.getAll);

route.post("/", product.createOne);

route.get("/:id", product.getOne);


route.put("/:id", product.updateOne);

route.delete("/:id", product.deleteOne);

module.exports = route;
