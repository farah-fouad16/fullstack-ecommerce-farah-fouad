import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../context/CartContext';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product Catalog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/products/${p.id}`}>Details</Link>
            <button onClick={() => addToCart(p)} style={{ marginLeft: '10px' }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}