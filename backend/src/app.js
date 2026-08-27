const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Task 1.3: Security Protections (Helmet, CORS, Rate Limiting)
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Task 4.2: Structured JSON Logging (Timestamp + Severity Level)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 400 ? 'ERROR' : 'INFO',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTimeMs: Date.now() - start
    }));
  });
  next();
});

// Task 1.4: Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// ... Keep your existing routes below (e.g., auth.routes, product.routes, etc.) ...

module.exports = app;