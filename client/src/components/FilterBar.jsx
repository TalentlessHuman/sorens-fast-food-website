import React from 'react';
import './FilterBar.css';

const FilterBar = ({ handleSort }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="sort-options">Sort By:</label>
        <select id="sort-options" onChange={(e) => handleSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="quantity-asc">Quantity: Low to High</option>
          <option value="quantity-desc">Quantity: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;