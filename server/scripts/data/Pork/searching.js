import fs from 'fs';

// Read the JSON file
const rawData = fs.readFileSync('pork_recipies.json');
const recipes = JSON.parse(rawData);

// Prepare an array to store the modified recipe details
const modifiedRecipes = [];

// Modify and store details for each recipe
recipes.forEach(recipe => {
    const modifiedRecipe = {
        recipeName: recipe.label,
        ingredients: recipe.ingredients.map(ingredient => ({
            food: ingredient.food,
            quantity: ingredient.quantity,
            measure: ingredient.measure
        })),
        healthLabels: recipe.healthLabels.map(label => label.replace(/-/g, '')),
        totalTime: recipe.totalTime,
        instructions: recipe.instructions
    };

    modifiedRecipes.push(modifiedRecipe);
});

// Write the modified results to a file
const modifiedRecipesJSON = JSON.stringify(modifiedRecipes, null, 2);
fs.writeFileSync('modified_pork_recipes.json', modifiedRecipesJSON);

console.log('Modified recipes have been saved to modified_pork_recipes.json');
