const mongoose = require('mongoose');


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
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
     type: String ,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  user : {
    type :mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
});


const Product = mongoose.model('Product', productSchema);
module.exports = { Product };