const express = require('express');
const router = express.Router();
const multer = require('multer'); // 👈 Import multer
const path = require('path'); // 👈 Import path module
const auth = require('../middleware/authMiddleware');

const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where files will be stored
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwrites
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// --- End Multer Configuration ---


// -- Routes --
router.get('/', getAllItems);

// 👇 Update the POST route to use the multer upload middleware
router.post('/', auth, upload.single('image'), createItem);

// 👇 Update the PUT route to use the multer upload middleware
router.put('/:id', auth, upload.single('image'), updateItem);

router.delete('/:id', auth, deleteItem);

module.exports = router;