import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import FilterBar from '../components/FilterBar';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // 👇 This is the line to fix
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/items`);
        setItems(response.data);
        setDisplayedItems(response.data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  const handleSort = (sortKey) => {
    let sortedItems = [...items];
    switch (sortKey) {
      case 'price-asc':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case 'quantity-asc':
        sortedItems.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantity-desc':
        sortedItems.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        // For 'default', we revert to the original order
        sortedItems = [...items];
        break;
    }
    setDisplayedItems(sortedItems);
  };

  return (
    <>
      <FilterBar handleSort={handleSort} />
      {displayedItems.length > 0 ? (
        <ItemList items={displayedItems} />
      ) : (
        <p>Loading menu...</p>
      )}
    </>
  );
};

export default HomePage;