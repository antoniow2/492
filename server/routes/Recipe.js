const express = require("express");
const router = express.Router();
const {
  Users,
  Recipe,
  Recipe_Ingredient,
  Ingredient,
  FridgeIngredient,
  DietaryRestrictions,
  DietaryRestriction,
  HealthLabel,
  Sequelize,
  sequelize,
} = require("../models");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');

router.get('/recipe_of_the_week', async (req, res) => {
  try {
    // Find the current recipe of the week
    const currentRecipeOfTheWeek = await Recipe.findOne({
      where: {
        recipe_of_the_week: true,
      },
    });

    // Check if the current recipe of the week exists and if its timestamp is older than 7 days
    const shouldSelectNewRecipe =
      currentRecipeOfTheWeek &&
      currentRecipeOfTheWeek.recipe_of_the_week_timestamp &&
      new Date() - currentRecipeOfTheWeek.recipe_of_the_week_timestamp > 7 * 24 * 60 * 60 * 1000;

    if (shouldSelectNewRecipe) {
      await Recipe.update(
        {
          recipe_of_the_week: false,
          recipe_of_the_week_timestamp: null, // Reset the timestamp
        },
        {
          where: {
            id: currentRecipeOfTheWeek.id,
          },
        }
      );

      // Find a new random recipe that is not the current recipe of the week
      const randomRecipe = await Recipe.findOne({
        where: {
          recipe_of_the_week: false,
        },
        order: sequelize.random(),
      });

      if (!randomRecipe) {
        return res.status(404).json({ error: 'No available recipes.' });
      }

      // Update the selected recipe set the timestamp
      await Recipe.update(
        {
          recipe_of_the_week: true,
          recipe_of_the_week_timestamp: new Date(),
        },
        {
          where: {
            id: randomRecipe.id,
          },
        }
      );

      return res.status(200).json(randomRecipe);
    } else {
      return res.status(200).json(currentRecipeOfTheWeek);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post("/recipes", async (req, res) => {
  try {
    // Getting the Data
    const recipe_name = await Recipe.findAll({
      attributes: ["id", "title"],
    });
    console.log(req.query.value)
    //Search
    const matchingRecipes = [];
    console.log(recipe_name.length)
    for (let i = 0; i < recipe_name.length; i++) {
      if (recipe_name[i].title.includes(req.query.value)) {
        // matchingRecipes.push(recipe_name[i]);
        matchingRecipes.push({
          recipeName: recipe_name[i].title,
          recipeID: i
        });
        //console.log(recipe_name[i].title)
      }
    }

    res.json(matchingRecipes);
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recipesIngredient", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    //====================== Search recipes that fit the allergy requirements ======================
    const healthLabelList = await DietaryRestrictions.findAll({
      where: { user_id: userId },
      attributes: ["healthLabel_id"],
    });

    const matchingRecipes = [];
    
    if(healthLabelList.length >= 1) {
    // console.log(healthLabelList);
    const recipeHealthLabels = await Recipe.findAll({
      include: [
        {
          model: HealthLabel,
          through: "RecipeHealthLabels",
          attributes: ["label"],
        },
      ],
    });
    //console.log(recipeHealthLabels[0].HealthLabels[0].dataValues.RecipeHealthLabels.dataValues.healthLabel_id);
    let matchOnce = false;
    //console.log(recipeHealthLabels[1].dataValues)
    for (let i = 0; i < recipeHealthLabels.length; i++) {
      for (let k = 0; k < healthLabelList.length; k++) {
        for (let j = 0; j < recipeHealthLabels[i].HealthLabels.length; j++) {
          if (recipeHealthLabels[i].HealthLabels[j].dataValues.RecipeHealthLabels
            .dataValues.healthLabel_id == healthLabelList[k].healthLabel_id) 
          {
            matchingRecipes.push(recipeHealthLabels[i].dataValues.id);
            matchOnce = true;
            break;
          }
        }
        if (matchOnce) {
          matchOnce = false;
          break;
        }
      }
    }//====================== Search recipes that fit the allergy requirements ======================
    } 
    else{
      const recipeHealthLabels = await Recipe.findAll({
        attributes: ["id"],
      });
      for (let i = 0; i < recipeHealthLabels.length; i++) {
        matchingRecipes.push(recipeHealthLabels[i].id);
      }
    }
    

    const userIngredients = await FridgeIngredient.findAll({
      where: { user_id: userId },
      attributes: ["ingredient_id"],
    });

    const FinalOutput = [];

    for (const recipeId of matchingRecipes) {
      const recipeIngredients = await Recipe_Ingredient.findAll({
        where: { recipe_id: recipeId },
        attributes: ["ingredient_id"],
      });

      // Filter out recipes where the user has 3 or more ingredients in common
      const commonIngredients = recipeIngredients.filter((recipeIngredient) =>
        userIngredients.some(
          (userIngredient) =>
            userIngredient.ingredient_id === recipeIngredient.ingredient_id
        )
      );

      if (commonIngredients.length >= 3) {
        const missingIngredients = [];

        for (const recipeIngredient of recipeIngredients) {
          if (
            !commonIngredients.some(
              (common) =>
                common.ingredient_id === recipeIngredient.ingredient_id
            )
          ) {
            const ingredientName = await Ingredient.findOne({
              where: { id: recipeIngredient.ingredient_id },
              attributes: ["name"],
            });
            missingIngredients.push(ingredientName.name);
          }
        }

        const recipeTitle = await Recipe.findOne({
          where: { id: recipeId },
          attributes: ["id", "title", "instructions","total_time"],
        });

        FinalOutput.push({
          "recipeID": recipeTitle.id,
          "recipeName": recipeTitle.title, 
          "missingIngredients": missingIngredients,
          "instructions": recipeTitle.instructions,
          "total_time": recipeTitle.total_time
        });
      }
    }

    res.json(FinalOutput);
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/allergy", authenticate, async (req, res) => {

  try {
    const userId = req.userId;
    //====================== Search recipes that fit the allergy requirements ======================
    const healthLabelList = await DietaryRestrictions.findAll({
      where: { user_id: userId },
      attributes: ["healthLabel_id"],
    });

    const matchingRecipes = [];
    
    if(healthLabelList.length >= 1) {
      const recipeHealthLabels = await Recipe.findAll({
        include: [
          {
            model: HealthLabel,
            through: "RecipeHealthLabels",
            attributes: ["label"],
          },
        ],
      });
    
    //console.log(recipeHealthLabels[0].HealthLabels[0].dataValues.RecipeHealthLabels.dataValues.healthLabel_id);
    let matchOnce = false;
    
    
      //console.log(recipeHealthLabels[1].dataValues)
      for (let i = 0; i < recipeHealthLabels.length; i++) {
        for (let k = 0; k < healthLabelList.length; k++) {
          for (let j = 0; j < recipeHealthLabels[i].HealthLabels.length; j++) {
            if (recipeHealthLabels[i].HealthLabels[j].dataValues.RecipeHealthLabels
              .dataValues.healthLabel_id == healthLabelList[k].healthLabel_id
              && recipeHealthLabels[i].title.toLowerCase().includes(req.query.value.toLowerCase())) 
            {
              matchingRecipes.push(recipeHealthLabels[i].dataValues.id);
              matchOnce = true;
              break;
            }
          }
          if (matchOnce) {
            matchOnce = false;
            break;
          }
        }
      }//====================== Search recipes that fit the allergy requirements ======================
    } 
    else{
      const recipeHealthLabels = await Recipe.findAll({
        attributes: ["id", "title"],
      });
      for (let i = 0; i < recipeHealthLabels.length; i++) {
        console.log(recipeHealthLabels[i].title.toLowerCase().includes(req.query.value.toLowerCase()));
        if(recipeHealthLabels[i].title.toLowerCase().includes(req.query.value.toLowerCase())) {
          matchingRecipes.push(recipeHealthLabels[i].id);
        }
      }
    }

    const userIngredients = await FridgeIngredient.findAll({
      where: { user_id: userId },
      attributes: ["ingredient_id"],
    });

    const FinalOutput = [];

    for (const recipeId of matchingRecipes) {
      const recipeIngredients = await Recipe_Ingredient.findAll({
        where: { recipe_id: recipeId },
        attributes: ["ingredient_id"],
      });

      // Filter out recipes where the user has 3 or more ingredients in common
      const commonIngredients = recipeIngredients.filter((recipeIngredient) =>
        userIngredients.some(
          (userIngredient) =>
            userIngredient.ingredient_id === recipeIngredient.ingredient_id
        )
      );

      if (commonIngredients.length >= 0) {
        const missingIngredients = [];

        for (const recipeIngredient of recipeIngredients) {
          if (
            !commonIngredients.some(
              (common) =>
                common.ingredient_id === recipeIngredient.ingredient_id
            )
          ) {
            const ingredientName = await Ingredient.findOne({
              where: { id: recipeIngredient.ingredient_id },
              attributes: ["name"],
            });
            missingIngredients.push(ingredientName.name);
          }
        }

        const recipeTitle = await Recipe.findOne({
          where: { id: recipeId },
          attributes: ["id", "title", "instructions","total_time"],
        });

        FinalOutput.push({
          "recipeID": recipeTitle.id,
          "recipeName": recipeTitle.title, 
          "missingIngredients": missingIngredients,
          "instructions": recipeTitle.instructions,
          "total_time": recipeTitle.total_time
        });
      }
    }
    res.json(FinalOutput);

    
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/library", authenticate, async (req, res) => {
  try{
    const allRecipes = await Recipe.findAll({
      attributes: ["id", "title", "instructions", "total_time", "image"],
    });

    const recipesData = allRecipes.map(recipe => ({
      "recipeID": recipe.id,
      "recipeName": recipe.title,
      "instructions": recipe.instructions,
      "total_time": recipe.total_time,
      "image": recipe.image,
    }));

    res.json(recipesData);
  }
  catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;