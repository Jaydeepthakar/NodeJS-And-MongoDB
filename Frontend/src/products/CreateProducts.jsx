import React from 'react';
import './createProducts.css';
import { api } from '../common/common';

function CreateProducts() {

  const [productData, setProductData] = React.useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: ''
  });

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const dataToSend = {
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
    };

    try {
      const response = await fetch(api.create.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setMessage('Product created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to create product'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          required
        />
        <input
          name="images"
          placeholder="Image URL"
          value={productData.images}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateProducts;