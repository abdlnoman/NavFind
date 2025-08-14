// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);


module.exports = router;
