const fs = require("fs");
const path = require("path");
const { Recipe } = require("../models");

const recipeImages = {
  "Baked Chicken": "baked_chicken.png",
  "Buffalo Chicken Salad": "buffalo_chicken_salad.png",
  "Catalan Chicken": "catalan_chicken.png",
  "Chicken cacciatore": "chicken_cacciatore.png",
  "Chicken Liver Pâté": "chicken_liver_pate.png",
  "Chicken Paprikash": "chicken_paprikash.png",
  "Chicken Salad With Mango & Basil": "chicken_salad_with_mango.png",
  "Chicken Stew": "chicken_stew.png",
  "Chicken Vesuvio": "chicken_vesuvio.png",
  "Kreplach (Chicken Dumplings)": "kreplach.png",
  "Persian Chicken": "persian_chicken.png",
  "Roast Chicken": "roast_chicken.png",
  "Barbecued Pork": "barbecued_pork.png",
  "Double-Pork Carnitas": "double_pork_carnitas.png",
  "Zuni-Inspired Grilled Chicken Salad": "grilled_chicken_salad.png",
  "Grilled Tofu Salad With Miso Dressing": "grilled_tofu_salad.png",
  "Pandan Wrapped Roast Pork": "pandan_wrapped_roast_pork.png",
  "Pork Chops": "pork_chops.png",
  "Pork Lomitos": "pork_lomitos.png",
  "Pork Quesadillas": "pork_quesadillas.png",
  "Pork rillons": "pork_rillons.png",
  "Pork Sorpotel (Goan Pork Offal Stew) Recipe": "pork_sorpotel.png",
  "Rarebit Pork Chops": "rarebit_pork_chops.png",
  "Spicy Dr. Pepper Shredded Pork": "spicy_dr_pepper_shredded_pork.png",
  "Double-Salmon Dip": "double_salmon_dip.png",
  "Potted Fresh & Smoked Salmon": "potted_salmon.png",
  "Quick Meal - Paprika Roasted Salmon": "paprika_roasted_salmon.png",
  "Roasted Salmon": "roasted_salmon.png",
  "Salmon Rillettes": "salmon_rillettes.png",
  "Salmon Rillettes Recipe": "salmon_rillettes.png",
  "Salmon Rillettes/Salmon Spread": "salmon_rillettes.png",
  "Salmon Spread": "salmon_rillettes.png",
  "Salmon Tartare": "salmon_tartare.png",
  "Pan-Fried Steak": "pan_fried_steak.png",
  "Perfect Porterhouse Steak recipes": "porterhouse_steak.png",
  "Rump steak": "rump_steak.png",
  "Skirt Steak and Hanger Steak": "skirt_steak.png",
  "Steak & Chips Salad": "Steak_&_Chips_Salad.png",
  "Steak Bites": "steak_bites.png",
  "Stir-fry Pepper Steak": "stir_fry_pepper_steak.png",
  "Strawberry Hazelnut Salad": "strawberry_hazelnut_salad.png",
  "Vietnamese Sugar Steak": "vietnamese_sugar_steak.png",
  "Feta And Lemon Lamb": "feta_and_lemon_lamb.png",
  "Köşk Kebabý (Lamb Kebabs With Eggplant)": "kosk_kebaby.png",
  "Lamb & cheese pie": "lamb_and_cheese_pie.png",
  "Lamb Broth": "lamb_broth.png",
  "Lamb Meatballs": "lamb_meatballs.png",
  "Lamb Sausages": "lamb_sausage.png",
  "Poached Lamb Shanks": "poached_lamb_shanks.png",
  "Quick Lamb Biryani": "lamb_biryani.png",
  "Roast Rack of Lamb": "rack_of_lamb.png",
  "Rosemary Crusted Lamb Chops recipes": "rosemary_lamb_rack.png",
  "Shrimp Salad": "shrimp_salad.png",
  "Bland Shrimp Salad": "bland_shrimp_salad.png",
  "Salmon Benedict": "salmon_benedict.png",
  "Salmon Sandwich": "salmon_sandwich.png",
  "Vegan cupcakes": "vegan_cupcakes.png",
  "Vegan ChocolateCoffee Muffins": "vegan_chocolate-coffee_muffins.png",
  "Spiked Vegan Eggnog": "spiked_vegan_eggnog.png",
  "Vegan Cucumber Tea Sandwiches": "vegan_cucumber_tea_sandwiches.png",
  "Marbled Chocolate Protein Cookies": "marbled_chocolate_protein_cookies.png",
  "Vegan Nachos": "vegan_nachos.png",
  "Vegan Breakfast Sandwich": "vegan_breakfast_sandwich.png",
  "Classic American Fare": "classic_american_fare.png",
  "Peanut Butter & Honey Muffins": "peanut_butter_&_honey_muffins.png",
  "Pots de Crème": "pots_de_crème.png",
  "Individual vegetarian lasagnes": "individual_vegetarian_lasagnes.png",
  "Vegetarian StirFried Garlic Scape": "vegetarian_stir-fried_garlic_scape.png",
  "Cheat’s cheesy focaccia": "cheat’s_cheesy_focaccia.png",
  "Vegetarian Shepherd's Pie": "vegetarian_shepherd's_pie.png",
  "Vegetarian Gumbo": "vegetarian_gumbo.png",
  "Breakfast Burritos With Vegetarian Sausage":
    "breakfast_burritos_with_vegetarian_sausage.png",
  "Vegetarian Poutine": "vegetarian_poutine.png",
  "Vegetarian Thai Red Curry": "vegetarian_thai_red_curry.png",
  "Zucchini With Thyme": "zucchini_with_thyme.png",
  "Vegetarian Bagel": "vegetarian_bagel.png",
};

const updateRecipeImages = async () => {
  try {
    // Loop through the recipeImages object and update the images
    for (const [recipeName, imageName] of Object.entries(recipeImages)) {
      const recipe = await Recipe.findOne({
        where: { title: recipeName },
      });

      if (recipe) {
        // Update the 'image' field with the new image filename
        await recipe.update({ image: imageName });
        console.log(`Updated image for ${recipeName}`);
      } else {
        console.log(`Recipe not found: ${recipeName}`);
      }
    }

    console.log("Finished updating recipe images.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
updateRecipeImages();
