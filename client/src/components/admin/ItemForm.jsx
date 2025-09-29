import React, { useState, useEffect } from 'react';
import './ItemForm.css';

const ItemForm = ({ itemToEdit, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageFile, setImageFile] = useState(null); // 👈 State for the image file
  const [preview, setPreview] = useState(''); // 👈 State for image preview

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setPrice(itemToEdit.price);
      setQuantity(itemToEdit.quantity);
      if (itemToEdit.imageUrl) {
        setPreview(`http://localhost:5000${itemToEdit.imageUrl}`);
      }
    }
  }, [itemToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // We now use FormData to send file and text data together
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (imageFile) {
      formData.append('image', imageFile); // 'image' must match the field name in multer
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <h2>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>
          
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </div>
          
          {/* 👇 New file input and image preview */}
          <div className="form-group">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">Save Changes</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;