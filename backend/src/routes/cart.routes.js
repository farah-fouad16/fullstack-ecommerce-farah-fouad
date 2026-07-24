const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user.id },
    include: { product: true }
  });
  res.json(items);
});

router.post('/', authenticateToken, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const existing = await prisma.cartItem.findFirst({
    where: { userId: req.user.id, productId }
  });

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }
    });
    return res.json(updated);
  }

  const item = await prisma.cartItem.create({
    data: { userId: req.user.id, productId, quantity }
  });
  res.status(201).json(item);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  await prisma.cartItem.delete({ where: { id: req.params.id } });
  res.json({ message: 'Item removed' });
});

module.exports = router;