import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ShoppingCart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>{item.name} (x{item.quantity})</span>
          <span>${item.price * item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}