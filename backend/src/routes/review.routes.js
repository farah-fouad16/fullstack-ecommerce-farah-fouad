const express = require('express');
const router = express.Router();
const axios = require('axios');

// Your live microservice link
const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'https://fullstack-ecommerce-farah-fouad-review-service-cg5raessc.vercel.app';

router.get('/:productId', async (req, res) => {
  try {
    const response = await axios.get(`${REVIEW_SERVICE_URL}/api/reviews/${req.params.productId}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews from service' });
  }
});

module.exports = router;