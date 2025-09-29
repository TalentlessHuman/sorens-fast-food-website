const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  // Add this new field for the image URL
  imageUrl: {
    type: String,
    required: false, // Image is optional for now, can be changed later
    default: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=No+Image', // Default placeholder
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('item', ItemSchema);