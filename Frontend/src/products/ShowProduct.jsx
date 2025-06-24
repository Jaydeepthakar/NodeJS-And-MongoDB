import React from 'react';
import { productApi } from '../common/common';


function ShowProduct() {
  const [products, setProducts] = React.useState([]);
  const [fetchingProducts, setFetchingProducts] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const fetchProducts = async () => {
    setFetchingProducts(true);
    setMessage('');

    try {
      const response = await fetch(productApi.getall.url, {
        method: productApi.getall.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || []);
      } else if (response.status === 401) {
        setMessage('Unauthorized. Please login first.');
        setProducts([]);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || 'Failed to fetch products'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setFetchingProducts(false);
    }
  };

  return (
    <div>
      <h3>All Products</h3>
      <button onClick={fetchProducts} disabled={fetchingProducts}>
        {fetchingProducts ? 'Loading...' : 'Show Products'}
      </button>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((prod, index) => (
            <div key={index} className="product-card">
              <h4>{prod.name}</h4>
              <p>{prod.description}</p>
              <p><strong>Price:</strong> ₹{prod.price}</p>
              <p><strong>Category:</strong> {prod.category}</p>
              <p><strong>Stock:</strong> {prod.stock}</p>
              {prod.images && prod.images[0] && (
                <img src={prod.images[0]} alt={prod.name} width="100" />
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ShowProduct;
