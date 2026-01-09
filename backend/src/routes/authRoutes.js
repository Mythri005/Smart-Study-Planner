const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', validateRegister, validate, authController.register);
router.post('/login', validateLogin, validate, authController.login);

// Protected routes
router.get('/profile', auth, authController.getProfile);

module.exports = router;