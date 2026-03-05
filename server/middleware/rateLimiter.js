const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: 'Too many search requests, please slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { generalLimiter, loginLimiter, searchLimiter };
