// Justin on the search!
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults, itemFromRecipeGenerator }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        return;
      }

      const formattedSearchTerm = searchTerm.trim().replace(/\s+/g, '_');

      const response = await axios.get(`${process.env.PUBLIC_URL}/Products/${formattedSearchTerm.toLowerCase()}_prices.json`);
      const data = response.data.data;

      
      onSearchResults(data, searchTerm);
    } catch (error) {
      console.error('Error fetching data:', error);
      onSearchResults([], searchTerm); 
    }
  };

  useEffect(() => {
    if(itemFromRecipeGenerator != null) {
      setSearchTerm(itemFromRecipeGenerator); // Fetch data when component mounts

    }
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" onClick={handleSearch} button={true.toString()}>Search</button>
      
    </div>
  );
};

export default SearchBar;
