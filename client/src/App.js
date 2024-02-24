import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import RecipeGenerator from "./RecipeGenerator";
import PriceComparer from "./PriceComparer";
import Contact from "./Contact";
import About from "./About";
import DietaryRestrictions from "./DietaryRestrictions";

function App() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (selectedIngredient !== null) {
      // Reset selectedIngredient after redirection
      setSelectedIngredient(null);
    }
    if (selectedRecipe !== null){
      setSelectedRecipe(null);
    }
  }, [selectedIngredient, selectedRecipe]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/home" Component={Home} />
          <Route path="/RecipeGenerator"
            element={
              <RecipeGenerator 
                onIngredientSelect={setSelectedIngredient}
                selectedRecipe={selectedRecipe}
              />
            }
          />
          <Route path="/pricecomparer"
            element={<PriceComparer ItemToSearch={selectedIngredient} />}
          />
          <Route path="/profile" 
            element={
              <Profile
                onRecipeSelect={setSelectedRecipe}
              />
            }           
          />
          <Route path="/contactus" Component={Contact} />
          <Route path="/about" Component={About} />
          <Route path="/dietary" Component={DietaryRestrictions} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;