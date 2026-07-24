import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
}