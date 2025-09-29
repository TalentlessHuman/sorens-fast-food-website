const Item = require('../models/Item');
// const Item = require('../models/Item');

// @desc    Get all food items
// @route   GET /api/items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new food item
// @route   POST /api/items
// ... keep getAllItems and deleteItem functions

// @desc    Add a new food item
const createItem = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    // The image path will come from the multer middleware
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new Item({
      name,
      price,
      quantity,
      imageUrl,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// @desc    Update a food item
const updateItem = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    const itemFields = {};
    if (name) itemFields.name = name;
    if (price) itemFields.price = price;
    if (quantity !== undefined) itemFields.quantity = quantity;

    // Check if a new file was uploaded
    if (req.file) {
      itemFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// module.exports = {
//   getAllItems,
//   createItem,
//   updateItem,
//   deleteItem,
// };
// @desc    Delete a food item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await Item.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getAllItems,
  createItem,
  updateItem, // 👈 Add this
  deleteItem, // 👈 Add this
};