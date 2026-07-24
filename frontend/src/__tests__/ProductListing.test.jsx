import { render, screen } from '@testing-library/react';
import ProductListing from '../pages/ProductListing';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

test('renders catalog header', () => {
  render(
    <CartProvider>
      <BrowserRouter>
        <ProductListing />
      </BrowserRouter>
    </CartProvider>
  );
  expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
});