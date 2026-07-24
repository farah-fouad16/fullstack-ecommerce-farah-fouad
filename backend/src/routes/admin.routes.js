const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  const totalUsers = await prisma.user.count();
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();

  res.json({ totalUsers, totalProducts, totalOrders, revenue: 1540.00 });
});

module.exports = router;