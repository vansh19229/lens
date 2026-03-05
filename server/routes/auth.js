const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, updateProfile, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { validateRegister, validateLogin, validateChangePassword } = require('../middleware/validate');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/register', validateRegister, register);
router.post('/login', loginLimiter, validateLogin, login);
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, validateChangePassword, changePassword);

module.exports = router;
