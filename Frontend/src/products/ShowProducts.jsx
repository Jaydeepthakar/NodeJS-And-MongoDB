import React, { useEffect, useState } from 'react';
import { productApi } from '../common/common';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(productApi.getall.url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li  key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowProducts;