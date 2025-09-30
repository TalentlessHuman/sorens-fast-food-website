import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import ItemForm from '../components/admin/ItemForm'; // 👈 Import the form
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // New state for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // null for 'Add', item object for 'Edit'

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/login`);
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching items on dashboard', err);
        handleLogout();
      }
    };
    fetchItems();
  }, [handleLogout]);

  // Modal handler functions
  const openModal = (item = null) => {
    setCurrentItem(item); // Set the item to be edited, or null for a new item
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null); // Reset current item
  };

  // Save handler for both creating and updating
    const handleSave = async (formData) => {
    // New config for sending multipart/form-data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      if (currentItem) {
        // --- UPDATE ---
        const res = await axios.put(`http://localhost:5000/api/items/${currentItem._id}`, formData, config);
        setItems(items.map((item) => (item._id === currentItem._id ? res.data : item)));
        alert('Item updated successfully!');
      } else {
        // --- CREATE ---
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData, config);
        setItems([...items, res.data]);
        alert('Item added successfully!');
      }
      closeModal();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to save item.');
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${itemId}`);
        setItems(items.filter((item) => item._id !== itemId));
        alert('Item deleted successfully!');
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div>
          {/* Button to open the "Add New Item" modal */}
          <button onClick={() => openModal()} className="create-btn">Create New Item</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <table className="items-table">
        {/* ... table head ... */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td><img src={`${process.env.REACT_APP_API_URL}${item.imageUrl}`} alt={item.name} className="item-thumbnail" /></td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                {/* Button to open the "Edit Item" modal */}
                <button onClick={() => openModal(item)} className="action-btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render the modal and form */}
      {isModalOpen && (
        <ItemForm
          itemToEdit={currentItem}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};


// ... (keep all the other code in AdminDashboard)



// ... (keep the rest of the code in AdminDashboard)

export default AdminDashboard;