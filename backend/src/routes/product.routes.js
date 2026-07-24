const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { search, category, sort, page = 1, limit = 10 } = req.query;
  const where = {};

  if (search) where.name = { contains: search, mode: 'insensitive' };
  if (category) where.categoryId = category;

  const orderBy = sort === 'price_asc' ? { price: 'asc' } : sort === 'price_desc' ? { price: 'desc' } : { name: 'asc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * parseInt(limit),
    take: parseInt(limit),
    include: { category: true }
  });

  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true }
  });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  const { name, description, price, categoryId, imageUrl } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price: parseFloat(price), categoryId, imageUrl }
  });
  res.status(201).json(product);
});

router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: { name, description, price: parseFloat(price), categoryId }
  });
  res.json(product);
});

router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ message: 'Product deleted' });
});

module.exports = router;