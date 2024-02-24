// src/Comparer.js
import React, { useState } from 'react';
import axios from 'axios';

const PriceComparator = () => {
  const [items, setItems] = useState([ //Place to pull from list whenever we get there
    { id: 1, name: 'Item 1', price: 10 }, // Just a place holder for now
    { id: 2, name: 'Item 2', price: 15 },
    { id: 3, name: 'Item 3', price: 20 },
   
  ]);

  // State to store the selected items
  const [selectedItems, setSelectedItems] = useState([]);
  // State to store the total price of selected items
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle item click and toggle selection
  const handleItemClick = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId); // Find the selected item by its ID then see if it's been selected already
    const isItemSelected = selectedItems.includes(selectedItem);

    if (isItemSelected) { //if selected it removes it from the list
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  // Calculate total price whenever selectedItems change
  React.useEffect(() => {
     // Use reduce built in thingy to sum up the prices of selected items
    const newTotalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotalPrice); // then update total price
  }, [selectedItems]);

  return (
    <div>
      <h1>Price Comparator</h1>
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => handleItemClick(item.id)} style={{ cursor: 'pointer' }}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <h2>Total Price: ${totalPrice}</h2>
    </div>
  );
};

export default PriceComparator;
