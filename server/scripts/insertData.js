// const fs = require('fs');
// const path = require('path');
// const { Recipe, Ingredient, Recipe_Ingredient, HealthLabel } = require('../models');

// // Array of file names
// const recipeFiles = [
//   'modified_salmon_recipes.json',
//   'modified_chicken_recipes.json',
//   'modified_steak_recipes.json',
//   'modified_pork_recipes.json',
//   'modified_salad_recipes.json',
//   'modified_lamb_recipes.json',
//   'modified_vegan_recipes.json',
//   'modified_vegetarian_recipes.json',
// ]

// recipeFiles.forEach((fileName) => {
//   try {
//     // Read JSON data
//     const jsonData = fs.readFileSync(path.join(__dirname,  fileName), 'utf-8');
//     const recipesData = JSON.parse(jsonData);

//     // Insert data into Recipes table
//     recipesData.forEach(async (recipe) => {
//       try {
//         // Insert data in Recipes table
//     const [createdRecipe, isCreated] = await Recipe.findOrCreate({
//       where: { title: recipe.recipeName },
//       defaults: {
//         instructions: recipe.instructions.join('\n'),
//         total_time: recipe.totalTime,
//       },
//     })

//     // Insert data in Ingredients table
//     await Promise.all(recipe.ingredients.map(async (ingredientData) => {
//       const normalizedIngredientName = ingredientData.food.toLowerCase().trim()
//       const [ingredient] = await Ingredient.findOrCreate({
//         where: { name: normalizedIngredientName },
//       })

//       console.log(isCreated ? 'Recipe Created' : 'Recipe Already Existed')

//       // Insert data in Recipe_Ingredient table
//       await Recipe_Ingredient.create({
//         recipe_id: createdRecipe.id,
//         ingredient_id: ingredient.id,
//         quantity: ingredientData.quantity,
//         measure: ingredientData.measure,
//       })
//     }))

//     // Insert data in HealthLabel table
//     await Promise.all(recipe.healthLabels.map(async (healthLabelData) => {
//       const [healthLabel] = await HealthLabel.findOrCreate({
//         where: { label: healthLabelData },
//       })

//       console.log(isCreated ? 'Health Label Created' : 'Health Label Already Existed')

//       // Associate HealthLabel with Recipe
//       await createdRecipe.addHealthLabel(healthLabel)
//     }))
//       } catch (error) {
//         console.error('Error inserting', error);
//       }
//     });
//   } catch (error) {
//     console.error('Error reading JSON file', error);
//   }
// });

// console.log('Data insertion completed.');

const fs = require("fs");
const path = require("path");
const {
  Recipe,
  Ingredient,
  Recipe_Ingredient,
  HealthLabel,
} = require("../models");

// Read JSON data
const jsonData = fs.readFileSync(
  path.join(__dirname, "modified_vegetarian_recipes.json"),
  "utf-8"
);
const recipesData = JSON.parse(jsonData);

// Insert data into Recipes table
recipesData.forEach(async (recipe) => {
  try {
    // Insert data in Recipes table
    const [createdRecipe, isCreated] = await Recipe.findOrCreate({
      where: { title: recipe.recipeName },
      defaults: {
        instructions: recipe.instructions.join("\n"),
        total_time: recipe.totalTime,
      },
    });

    // Insert data in Ingredients table
    await Promise.all(
      recipe.ingredients.map(async (ingredientData) => {
        const normalizedIngredientName = ingredientData.food
          .toLowerCase()
          .trim();
        const [ingredient] = await Ingredient.findOrCreate({
          where: { name: normalizedIngredientName },
        });

        console.log(isCreated ? "Recipe Created" : "Recipe Already Existed");

        // Insert data in Recipe_Ingredient table
        await Recipe_Ingredient.create({
          recipe_id: createdRecipe.id,
          ingredient_id: ingredient.id,
          quantity: ingredientData.quantity,
          measure: ingredientData.measure,
        });
      })
    );

    // Insert data in HealthLabel table
    await Promise.all(
      recipe.healthLabels.map(async (healthLabelData) => {
        const [healthLabel] = await HealthLabel.findOrCreate({
          where: { label: healthLabelData },
        });

        console.log(
          isCreated ? "Health Label Created" : "Health Label Already Existed"
        );

        // Associate HealthLabel with Recipe
        await createdRecipe.addHealthLabel(healthLabel);
      })
    );
  } catch (error) {
    console.error("Error inserting", error);
  }
});

console.log("Data insertion completed.");
