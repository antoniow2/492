import React, { useState, useEffect } from "react";

import { SearchBar } from "./SearchComponents/SearchBar";
import { SearchResultsList } from "./SearchComponents/SearchResultsList";

function Search( { onIngredientSelect, selectedRecipe } ) {
  const [results, setResults] = useState([]);
  const [inputedValue, setInputedValue] = useState("");
  const [ingredientSelected, setIngredientSelected] = useState(null);
  const [selectedRecipeFromProfile, setSelectedRecipeFromProfile] = useState('');

  useEffect(() => {
    if (ingredientSelected !== null) {
      // Reset selectedIngredient after redirection
      ingredientSelected(null);
    }
    if (selectedRecipe !== ""){
      setSelectedRecipeFromProfile(selectedRecipe);
    }
  }, [ingredientSelected, selectedRecipeFromProfile]);

  return (
    <div>
      <div>
      <SearchBar setResults={setResults} inputValue={setInputedValue} selectedRecipe={selectedRecipeFromProfile}/>
        <SearchResultsList
          results={results}
          inputValue={inputedValue}
          onIngredientSelect={onIngredientSelect} // Pass onIngredientSelect to SearchResultsList
        />
      </div>
    </div>
  );
}

export default Search;
