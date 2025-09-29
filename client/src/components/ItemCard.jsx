import React from 'react';
import { motion } from 'framer-motion';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const isSoldOut = item.quantity === 0;

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={cardVariants} className={`item-card ${isSoldOut ? 'sold-out' : ''}`}>
      <div className="item-image-container">
        {/* 👇 THE CORRECTED LINE 👇 */}
        <img src={`${process.env.REACT_APP_API_URL}${item.imageUrl}`} alt={item.name} className="item-image" />
        
        {isSoldOut && <div className="sold-out-overlay">SOLD OUT</div>}
      </div>
      <div className="item-info">
        <h2 className="item-name">{item.name}</h2>
        <p className="item-price">₹{item.price}</p>
        {!isSoldOut && <p className="item-quantity">Qty Left: {item.quantity}</p>}
      </div>
    </motion.div>
  );
};

export default ItemCard;