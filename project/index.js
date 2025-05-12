const express = require('express');
const { resolve } = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 3010;

// Sample products data
let products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
  { id: 2, name: 'Smartphone', price: 499.99, description: 'Latest model smartphone' },
  { id: 3, name: 'Headphones', price: 99.99, description: 'Wireless noise-canceling headphones' },
  { id: 4, name: 'Tablet', price: 299.99, description: '10-inch tablet with retina display' },
  { id: 5, name: 'Smartwatch', price: 199.99, description: 'Fitness tracking smartwatch' },
  { id: 6, name: 'Camera', price: 799.99, description: 'Professional DSLR camera' },
  { id: 7, name: 'Gaming Console', price: 399.99, description: 'Next-gen gaming console' },
  { id: 8, name: 'Wireless Speaker', price: 79.99, description: 'Portable Bluetooth speaker' },
  { id: 9, name: 'Monitor', price: 349.99, description: '27-inch 4K monitor' },
  { id: 10, name: 'Keyboard', price: 129.99, description: 'Mechanical gaming keyboard' }
];

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

// Middleware
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express Store',
    currentPage: 'home'
  });
});

// List all products
app.get('/products', (req, res) => {
  res.render('products/index', {
    title: 'Products - Express Store',
    currentPage: 'products',
    products: products
  });
});

// Show new product form
app.get('/products/new', (req, res) => {
  res.render('products/new', {
    title: 'New Product - Express Store',
    currentPage: 'products'
  });
});

// Create new product
app.post('/products', (req, res) => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  const newProduct = {
    id: newId,
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description
  };
  products.push(newProduct);
  res.redirect('/products');
});

// Show edit form
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  
  res.render('products/edit', {
    title: 'Edit Product - Express Store',
    currentPage: 'products',
    product: product
  });
});

// Update product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send('Product not found');

  products[index] = {
    id: id,
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description
  };
  
  res.redirect('/products');
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.redirect('/products');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});