const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authenticateToken } = require('../middleware/auth');

router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId });
  res.json(reviews);
});

router.post('/', authenticateToken, async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = new Review({
    productId,
    userName: req.user.email,
    rating,
    comment
  });
  await review.save();
  res.status(201).json(review);
});

module.exports = router;