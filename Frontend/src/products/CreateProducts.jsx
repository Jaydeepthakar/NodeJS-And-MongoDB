import React, { useState } from 'react';
import { productApi } from '../common/common';
import './createProducts.css'; // Assuming you have some styles for this component

function CreateProduct({ onProductCreated }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(productApi.create.url, {
        method: 'POST',
        body: formData,
        credentials: 'include', // ✅ cookie auth instead of token
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create product');
      }

      setMessage('Product created successfully!');
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
      });
      setImageFile(null);
      if (onProductCreated) onProductCreated();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
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
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
