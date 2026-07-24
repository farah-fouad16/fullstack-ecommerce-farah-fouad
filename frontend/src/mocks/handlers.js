import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000/api/products', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'Mock Headphones', price: 99.99, description: 'Test' }
      ])
    );
  })
];