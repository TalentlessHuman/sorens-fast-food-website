import React from 'react';
import ItemCard from './ItemCard';
import { motion } from 'framer-motion'; // 👈 Import motion
import './ItemList.css';

const ItemList = ({ items }) => {
  // 👇 Animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This will make cards appear one after another
      },
    },
  };

  return (
    // 👇 Use motion.div and apply the variants
    <motion.div
      className="item-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </motion.div>
  );
};

export default ItemList;