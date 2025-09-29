const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

// Route for registering the first admin
router.post('/register', registerAdmin);

// Route for admin login
router.post('/login', loginAdmin);

module.exports = router;