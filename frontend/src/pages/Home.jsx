import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Farah's Store</h1>
      <p>Discover tech products with super-fast delivery!</p>
      <Link to="/products">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Shop Now</button>
      </Link>
    </div>
  );
}