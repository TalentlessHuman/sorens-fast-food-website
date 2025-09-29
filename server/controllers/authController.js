const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
// const Item = require('../models/Item');

// @desc    Register the FIRST admin (run only once)
// @route   POST /api/auth/register
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if an admin already exists
    let admin = await Admin.findOne({ username });
    const adminCount = await Admin.countDocuments();

    if (admin || adminCount > 0) {
      return res.status(400).json({ msg: 'An admin account already exists. Registration is closed.' });
    }

    admin = new Admin({
      username,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();
    res.status(201).send('Admin registered successfully. You can now log in.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate admin & get token (Login)
// @route   POST /api/auth/login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // We need to create this secret key
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  
};