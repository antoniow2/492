// This code, with the "SearchBar.js" are for the search bar.
// It display the search results of the "SearchBar.js" code.

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";
import { RecipeGenerator } from "../RecipeGenerator";

export const SearchResultsList = ({ results, inputValue, onIngredientSelect }) => {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [recipeToShow, setRecipeToShow] = useState(null);
  const [response, setResponse] = useState([]);
  const [bookmarks, setBookmarks] = useState({});
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  // Assuming results is an object with a data property
  const dataArray = results.data || []; // Ensure that dataArray is an array, handle the case where results.data is undefined
  const isArrayofObjects = typeof dataArray[0] === "object";

  const handleButtonClick = (recipeName) => {
    setShowSearchResult(true);
    setRecipeToShow(recipeName);
    setResponse(inputValue);
  };

  useEffect(() => {
    if(inputValue !== response){
      setShowSearchResult(false);
      setResponse(inputValue);
    }
  }, [inputValue, response]);


  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    onIngredientSelect(ingredient);
  };


  const isBookmark = async (recipeID) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/users/isBookmarked",
        {
          data: { recipeID },
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      return response.data.full === 1;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return false;
    }
  };

  const toggleBookmark = async (recipeID) => {
    try {
      const isCurrentlyBookmarked = await isBookmark(recipeID);

      if (!isCurrentlyBookmarked) {
        await Axios.post(
          "http://localhost:3000/users/bookmark_recipe",
          {
            data: { recipeID },
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log("Recipe bookmarked successfully!");
      } else {
        await Axios.post(
          "http://localhost:3000/users/unbookmark_recipe",
          {
            data: { recipeID },
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log("Recipe unbookmarked successfully!");
      }

      // Update bookmark status after toggling
      setBookmarks((prevBookmarks) => ({
        ...prevBookmarks,
        [recipeID]: !isCurrentlyBookmarked,
      }));
    } catch (error) {
      console.error("Error bookmarking/unbookmarking recipe:", error);
    }
  };


  return (
    <div className="results-list">
      {/* SHOWS RESULTS OF THE SEARCH */}
      {(dataArray.length > 0 && showSearchResult === false) && (
        dataArray.map((result, index) => (
          <div key={isArrayofObjects ? result.recipeID : index}>
            {isArrayofObjects ? 
            <button onClick={() => handleButtonClick(result.recipeName)}>
              {result.recipeName}
            </button>  : result}
          </div>
        ))
      )}
      {dataArray.length === 0 && results && 
      <p>No results found or not within dietary restriction</p>}


      {/* IF YOU CLICK ON A RECIPE IT SHOWS IT HERE */}
      {showSearchResult && (
        <div>
          {dataArray.map((recipe) => {
            if (recipe.recipeName === recipeToShow) {
              return (
                <div key={recipe.recipeID}>
                  <h2>{recipe.recipeName}</h2>
                  <button onClick={() => toggleBookmark(recipe.recipeID)}>
                    {bookmarks[recipe.recipeID] ? "Unbookmark" : "Bookmark"}
                  </button>
                  <h3>
                  Missing {recipe.missingIngredients.length} ingredients:
                  </h3>
                  <ul>
                    {recipe.missingIngredients.map((ingredient, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0  && ", "}
                        {<Link
                        to="http://localhost:3001/PriceComparer"
                        onClick={() => handleIngredientClick(ingredient)}
                      >
                        {ingredient}
                      </Link>}
                      </React.Fragment>
                    ))}
                  </ul>
                  <p>Istructions:</p>
                  <p>{recipe.instructions}</p>
                  <br />
                  <p>Time: {recipe.total_time} mins</p>

                </div>
              );
            }
            return null;
          })}

        </div>
      )}
    </div>
  );
};

export default SearchResultsList;
