const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };






// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/dbConfig');

// const Product = sequelize.define('Product', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// }, {
//   tableName: 'products',
//   timestamps: true, 
// });

// module.exports = Product;

