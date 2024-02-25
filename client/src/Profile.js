import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Footer from "./Footer";
import Header from "./Header";
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ onRecipeSelect }) => {
  const [userData, setUserData] = useState({});
  const [savedIngredients, setSavedIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([]);

  const [showIngredientModal, setShowIngredientModal] = useState(false); // State to control the ingredient modal
  const [selectedIngredient, setSelectedIngredient] = useState(""); // State to store the selected ingredient

  //Profile Photo Variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState("");

  //Recipe of the Week
  const [recipeOfTheWeek, setRecipeOfTheWeek] = useState(null);

  //Favorite Recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [quantityError, setQuantityError] = useState("");

  const API = "https://whattocook2-4e261a72626f.herokuapp.com";

  const handleRecipeToSearchBar = (recipeTitle) => {
    if (onRecipeSelect) {
      onRecipeSelect(recipeTitle);
      navigate("/RecipeGenerator");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const previewImageURL = file ? URL.createObjectURL(file) : null;
    setPreviewImage(previewImageURL);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Get Recipe of the Week
  useEffect(() => {
    const fetchRecipeOfTheWeek = async () => {
      try {
        const response = await Axios.get(API + "/recipe/recipe_of_the_week");
        setRecipeOfTheWeek(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeOfTheWeek();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  // Fetch email and username
  function getUserData() {
    const authToken = Cookies.get("userToken");
    Axios.get(API + "/users/profile", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log("Profile response:", response.data);
        setUserData({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
        });
        setProfilePictureURL(response.data.profilePicture);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  const { username = "", email = "" } = userData || {};

  // Fridge Section
  const fetchIngredientOptions = async () => {
    try {
      const response = await Axios.get(
        `https://whattocook2-4e261a72626f.herokuapp.com/users/ingredient_options?query=${ingredientName}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      setError(null);
      setIngredientOptions(response.data.ingredientOptions);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(error.response.data.error);
        setIngredientName("");
        setIngredientQuantity("");
        setIngredientOptions("");
      } else {
        console.error(error);
      }
    }
  };

  const handleIngredientOptionClick = (option) => {
    setSelectedIngredient(option);
    setShowIngredientModal(true);
  };

  // Fetch and display saved ingredients
  const fetchSavedIngredients = useCallback(async () => {
    try {
      const response = await Axios.get(API + "/users/saved_ingredients", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      setSavedIngredients(response.data.savedIngredients);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSavedIngredients();
  }, []);

  const handleAddIngredient = async () => {
    try {
      const ingredientName = selectedIngredient;

      if (isNaN(ingredientQuantity) || ingredientQuantity === "") {
        console.log("not a number");
        setShowIngredientModal(false);
        setQuantityError("Not a valid quantity. Please enter a number.");
        return;
      }

      const response = await Axios.post(
        API + "/users/profile_ingredient_list",
        {
          name: ingredientName,
          quantity: ingredientQuantity,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      // Only fetch ingredients after a successful save
      fetchSavedIngredients();
      // empty fields
      setIngredientName("");
      setIngredientQuantity("");
      setIngredientOptions("");
      // closing Modal
      console.log("Adding ingredient:", selectedIngredient);
      setShowIngredientModal(false);
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }
  };

  const handleDeleteIngredient = async (ingredientName) => {
    try {
      const response = await Axios.delete(API + "/users/delete_ingredient", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        data: {
          name: ingredientName,
        },
      });
      setSavedIngredients(response.data.savedIngredients);
    } catch (error) {
      console.error(error);
    }
  };

  // Photo Section

  // post profile picture
  const handleProfilePictureUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profilePicture", selectedFile);

        const response = await Axios.post(
          API + "/users/upload_profile_picture",
          formData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) {
          getUserData();
          setProfilePictureURL(response.data.filePath);
          setShowUploadModal(false);
          window.location.reload(); //refreshes page
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Favorite Recipes Section

  const handleDeleteFavRecipe = async (recipe) => {
    try {
      await Axios.delete(API + "/users/unbookmark", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        data: {
          recipeID: recipe.id,
        },
      });
      window.location.reload(); //refreshes page
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await Axios.get(API + "/users/favorite_recipe", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        });
        setFavoriteRecipes(response.data.favoriteRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <div className="Profile-Page" style={{ backgroundColor: "tan" }}>
      <Header />
      <div className="top-section">
        <div className="Left-Panel">
          <div className="Profile-Card">
            <div className="Profile-Picture">
              <div
                className="picture-icon"
                onClick={() => setShowUploadModal(true)}
              >
                <img
                  className="pic-icon"
                  src="./images/profile/photo_icon.png"
                  alt="default_pic"
                />
              </div>
              {profilePictureURL ? (
                <img
                  className="profile-pic"
                  src={`https://whattocook2-4e261a72626f.herokuapp.com/uploads/${profilePictureURL}`}
                  alt="Profile"
                />
              ) : (
                <img
                  className="default"
                  src="./images/profile/profile_pic.jpg"
                  alt="Default Profile"
                />
              )}
            </div>

            <div className="card-content">
              <h1>Profile</h1>
              <p>Username: {username}</p>
              <p>Email: {email}</p>
            </div>
          </div>
          {showUploadModal && (
            <div className="upload-modal">
              <div className="upload-modal-content">
                <input
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="file" className="file-input-button">
                  Change Profile Picture
                </label>
                {previewImage && (
                  <img
                    className="preview-image"
                    src={previewImage}
                    alt="Preview"
                  />
                )}
                <button
                  type="button"
                  className="pic-upload"
                  onClick={handleProfilePictureUpload}
                >
                  Upload Picture
                </button>
                <button
                  type="button"
                  className="pic-cancel"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="Meal-of-Week">
            <h1> Meal of the Week </h1>
            {recipeOfTheWeek && (
              <>
                <img
                  className="r-arrow"
                  src="./images/profile/r_arrow.png"
                  alt="RecipeOftheWeek"
                  onClick={() => handleRecipeToSearchBar(recipeOfTheWeek.title)}
                />
                {/* Display the picture */}
                <img
                  className="recipe-img"
                  src={`https://whattocook2-4e261a72626f.herokuapp.com/recipe_images/${recipeOfTheWeek.image}`}
                  alt="Recipe"
                />
                {/* <p>{recipeOfTheWeek.title}</p> */}
              </>
            )}
          </div>
        </div>
        <div className="Right-Panel">
          <div className="favorite-section">
            <h2>BOOKMARKED RECIPES</h2>
            <div className="recipe-list">
              {favoriteRecipes.map((recipe) => (
                <div key={recipe.id} className="favorite-recipe">
                  {recipe.image ? (
                    <img
                      className="fav_recipe_image"
                      src={`${recipe.image}`}
                      alt={recipe.title}
                      onClick={() => handleRecipeToSearchBar(recipe.title)}
                    />
                  ) : (
                    // placeholder image
                    <img
                      className="fav_recipe_image"
                      src={`./images/profile/default_food.png`}
                      alt="Placeholder"
                      onClick={() => handleRecipeToSearchBar(recipe.title)}
                    />
                  )}
                  <div className="recipe-info">
                    <p>{recipe.title}</p>
                    <label
                      className="bookmark_icon"
                      onClick={() => handleDeleteFavRecipe(recipe)}
                    ></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="middle-section">
        <div className="L-Panel">
          <div className="Fridge">
            <div className="top-fridge">
              <div className="t-thin-handle"></div>
              <form className="add-items">
                {/* <h3>Ingredients:</h3> */}
                <input
                  className="add-items-input"
                  type="text"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  placeholder="Enter Ingredient Name"
                />
                <input
                  className="add-items-input"
                  type="text"
                  value={ingredientQuantity}
                  onChange={(e) => {
                    setIngredientQuantity(e.target.value);
                    setQuantityError("");
                  }}
                  placeholder="Quantity"
                />
              </form>
            </div>
            <div className="bottom-fridge">
              <div className="b-thin-handle"></div>

              {error && <div className="error-message">{error}</div>}
              {quantityError && (
                <div className="error-message">{quantityError}</div>
              )}
              {ingredientOptions.length > 0 && (
                <ul>
                  {ingredientOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleIngredientOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="save-button"
              type="button"
              onClick={fetchIngredientOptions}
            >
              Save
            </button>
            {/* Ingredient Modal */}
            {showIngredientModal && (
              <div className="ingredient-modal">
                <div className="modal-content">
                  <h2>{selectedIngredient}</h2>
                  <button onClick={handleAddIngredient}>Add Ingredient</button>
                  <button onClick={() => setShowIngredientModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="R-Panel">
          {/* <div class="cold-mist"></div> */}
          {/* <div className="vapor1">
            {[1, 3, 16, 5, 20, 6, 7, 9, 10, 17, 11, 12, 18, 13, 14, 2, 8, 15, 4, 19].map((index) => (
              <span key={index} style={{ '--i': index }}></span>
            ))}           
          </div>
          <div className="vapor2">
            {[11, 13, 16, 5, 17, 6, 7, 9, 10, 20, 1, 12, 18, 3, 14, 2, 8, 15, 4, 19].map((index) => (
              <span key={index} style={{ '--i': index }}></span>
            ))}           
          </div>
          <div className="vapor3">
            {[1, 3, 16, 5, 20, 6, 7, 9, 10, 17, 11, 12, 18, 13, 14, 2, 8, 15, 4, 19].map((index) => (
              <span key={index} style={{ '--i': index }}></span>
            ))}
          </div> */}
          <h1>Your Fridge</h1>
          {/* <div className="underline"></div> */}
          <div className="saved-items">
            <ul className="ingredient-item">
              {savedIngredients &&
                savedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    <h3>{capitalizeFirstLetter(ingredient.name)}</h3>
                    <h3>Quantity: {ingredient.quantity}</h3>
                    <button
                      id="fridge-button"
                      onClick={() => handleDeleteIngredient(ingredient.name)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withTokenExpirationCheck(Profile);
