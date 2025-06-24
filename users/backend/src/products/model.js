const mongoose = require('mongoose');
const userSchema = require('../user/model').userSchema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
  },
  imageUrl: {
  type: String,
  required: false
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },
});


const Product = mongoose.model('Product', productSchema);
module.exports = { Product };