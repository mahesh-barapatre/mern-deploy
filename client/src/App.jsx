// src/components/ExampleComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendUrl from "./env.js";

function ExampleComponent() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Adjust the API endpoint to the correct backend URL
    axios.get(`${backendUrl}/api/items`).then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleAddItem = async () => {
    // Adjust the API endpoint to the correct backend URL
    const response = await axios.post(`${backendUrl}/api/items`, { name: newItem });
    setItems([...items, response.data]);
    setNewItem('');
  };

  return (
    <div>
      <h1>MERN App</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default ExampleComponent;
