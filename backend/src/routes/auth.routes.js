const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateToken } = require('../middleware/auth');
const { sendWelcomeEmail } = require('../services/emailService');

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'CUSTOMER' }
    });
    await sendWelcomeEmail(user.email, user.name);
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(400).json({ message: 'User already exists or error created' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'super_secret_jwt_key',
    { expiresIn: '1d' }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/profile', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

router.put('/profile', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { name }
  });
  res.json({ id: updated.id, name: updated.name, email: updated.email, role: updated.role });
});

module.exports = router;