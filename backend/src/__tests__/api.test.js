const request = require('supertest');
const app = require('../app');

describe('API Health Check', () => {
  it('should return health status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});