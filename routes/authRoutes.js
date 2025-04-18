const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  authController.login
);

router.get('/verify', authMiddleware, authController.verify);

module.exports = router;