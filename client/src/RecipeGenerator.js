import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import Search from "./Search";
import "./RecipeGenerator.css";
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import { Link, Navigate } from "react-router-dom";

export const RecipeGenerator = ({ onIngredientSelect, selectedRecipe }) => {
  const [readyRecipes, setreadyRecipes] = useState([]);
  const [closeRecipes, setcloseRecipes] = useState([]);
  const [response, setResponse] = useState([]);
  const [clickedRecipe, setClickedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showMore, setShowMore] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await Axios.get(
          "https://whattocook2-4e261a72626f.herokuapp.com/recipe/library",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        setAllRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchLibrary();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await Axios.get(
        "https://whattocook2-4e261a72626f.herokuapp.com/recipe/recipesIngredient",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      setResponse(responseData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    const processRecipes = () => {
      const RR = [];
      const CR = [];
      response.forEach((recipe) => {
        if (recipe.missingIngredients.length === 0) {
          RR.push(recipe);
        } else {
          CR.push(recipe);
        }
      });
      setreadyRecipes(RR);
      setcloseRecipes(CR);
    };

    if (response) {
      processRecipes();
    }
  }, [response]);

  useEffect(() => {
    // Load bookmarked recipes
    const loadBookmarks = async () => {
      const newBookmarks = {};
      for (const recipe of closeRecipes) {
        const bookmarked = await isBookmark(recipe.recipeID);
        newBookmarks[recipe.recipeID] = bookmarked;
      }
      setBookmarks(newBookmarks);
    };

    loadBookmarks();
  }, [closeRecipes]);

  // Ayden Modified
  // This function shows the recipe's description when clicked.
  const handleButtonClick = (recipeName) => {
    if (recipeName !== clickedRecipe) {
      setClickedRecipe(recipeName);
    } else {
      setClickedRecipe(null);
    }
  };

  // When you click on a missing ingredient, I want to send the user to price comparer
  // with the ingredient filled in the search.
  // So, this function pass the ingredient string to the App.js, which passes it to
  // price comparer.
  const handleIngredientClick = (ingredient) => {
    console.log("Walter");
    setSelectedIngredient(ingredient);
    onIngredientSelect(ingredient);
  };

  // When you have more than 5 ingredients missing, you have the option to show the
  // whole list, or just the first 5 ingredient. This is the show more, or show less
  // button function.
  const handleButtonMoreOrLess = (recipeName) => {
    setShowMore((prev) => ({
      ...prev,
      [recipeName]: !prev[recipeName],
    }));
  };

  const isBookmark = async (recipeID) => {
    try {
      const response = await Axios.post(
        "https://whattocook2-4e261a72626f.herokuapp.com/users/isBookmarked",
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
      //const bookmarked = bookmarks[recipeID];
      const isCurrentlyBookmarked = await isBookmark(recipeID);

      if (!isCurrentlyBookmarked) {
        await Axios.post(
          "https://whattocook2-4e261a72626f.herokuapp.com/users/bookmark_recipe",
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
          "https://whattocook2-4e261a72626f.herokuapp.com/users/unbookmark_recipe",
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

  const handleIngredientSelect = (ingredient) => {
    console.log("Selected Ingredient:", ingredient);
    // Handle the selected ingredient logic here
  };

  return (
    <div className="recipe_page">
      <Header />
      <Search
        onIngredientSelect={handleIngredientClick}
        selectedRecipe={selectedRecipe}
      />
      <br />
      <br />
      <br />

      {readyRecipes.length > 0 && (
        <div>
          <h2>You have all the ingredients for this recipe:</h2>
          <ul>
            {readyRecipes.map((recipe, index) => (
              <li key={index}>
                {recipe.recipeName}
                <button onClick={() => toggleBookmark(recipe.recipeID)}>
                  {bookmarks[recipe.recipeID] ? "Unbookmark" : "Bookmark"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="library">
        {/* display all the recipe images and titles */}
        {allRecipes.length > 0 && (
          <div>
            <h2>All Recipes:</h2>
            <div className="library-list">
              {allRecipes.map((recipe, index) => (
                <div key={index} className="library-item">
                  <img
                    src={`https://whattocook2-4e261a72626f.herokuapp.com/recipe_images/${recipe.image}`}
                    alt={recipe.recipeName}
                  />
                  <h3>{recipe.recipeName}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {closeRecipes.length > 0 && (
        <div>
          <h2>Recipes with Missing Ingredients:</h2>
          <ul>
            {closeRecipes.map((recipeInfo, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => handleButtonClick(recipeInfo.recipeName)}
                  >
                    {recipeInfo.recipeName}
                  </button>{" "}
                  <button onClick={() => toggleBookmark(recipeInfo.recipeID)}>
                    {bookmarks[recipeInfo.recipeID] ? "Unbookmark" : "Bookmark"}
                  </button>
                  <br />
                  Missing {recipeInfo.missingIngredients.length} ingredients:
                  <ul>
                    {recipeInfo.missingIngredients.map((ingredient, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && idx < 5 && ", "}
                        {idx < 5 && (
                          <Link
                            to="/PriceComparer"
                            onClick={() => handleIngredientClick(ingredient)}
                          >
                            {ingredient}
                          </Link>
                        )}
                        {idx === 4 && !showMore[recipeInfo.recipeName] && (
                          <button
                            onClick={() =>
                              handleButtonMoreOrLess(recipeInfo.recipeName)
                            }
                          >
                            more
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                    {showMore[recipeInfo.recipeName] &&
                      recipeInfo.missingIngredients
                        .slice(5)
                        .map((ingredient, idx) => (
                          <React.Fragment key={idx}>
                            {", "}
                            <Link
                              to="/PriceComparer"
                              onClick={() => handleIngredientClick(ingredient)}
                            >
                              {ingredient}
                            </Link>
                          </React.Fragment>
                        ))}
                    {showMore[recipeInfo.recipeName] && (
                      <button
                        onClick={() =>
                          handleButtonMoreOrLess(recipeInfo.recipeName)
                        }
                      >
                        less
                      </button>
                    )}
                  </ul>
                  {clickedRecipe === recipeInfo.recipeName && (
                    <div>
                      <p>{recipeInfo.instructions}</p>
                      <p>{recipeInfo.total_time} mins</p>
                    </div>
                  )}
                  <br />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default withTokenExpirationCheck(RecipeGenerator);
