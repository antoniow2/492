const { writeFile } = require('fs').promises;
const fetch = require('node-fetch');

const accessToken =
  "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzA2NDIwMTgyLCJpYXQiOjE3MDY0MTgzNzcsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDY0MTgzODIxNDMxOTYyMDMsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.UbTVe6zxoZCLloxi_z07uqjdRfcxzQOOo3C-h5liVZ9YuOi21MvqNXvdnDUtC-AYlgdiczp5vf4fCqyiizOqgXGG37FL3TOniR3TaOXaf_iKLerYo-rYkXCMPoY4YjqWfCbM11SNC6lfGj2wk4uzsIK7VFYDdaqWkuI3A-qxg7NFHw8FjuPY3YDIaRQ0n6r89MLpLo4F9e41AcZsKIKXjxkK8cvReou4P9b82LDxW80WO5lXmjDVB9QLgUAB5Sqg67ySv4oMBGwF5Rbq_zKDqUJTTUFwjIzdi6ftTV3aajOwmGcUcOhklMSWJ2ubA6d4ZCigur4XMqyaNM13YDhjVQ"; // Replace with your actual access token
const locationId = "01400943"; // Replace with your actual locationId
const inputJsonFile = "vegefood.json"; // Replace with your actual input JSON file

// Read the JSON file containing ingredients
const ingredientsData = require(`./${inputJsonFile}`);
const ingredientsList = ingredientsData[0].ingredients;

// Function to fetch data from the Kroger API and write to a JSON file for each ingredient
async function fetchAndWriteKrogerProductData(ingredient) {
  try {
    const apiUrl = `https://api.kroger.com/v1/products?filter.term=${ingredient.food}&filter.locationId=${locationId}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Process the response to include only the "price" section for all brands
    const processedData = data.data.map((product) => ({
      productId: product.productId,
      brand: product.brand,
      upc: product.upc,
      price: product.items.map((item) => item.price),
    }));

    // Write the processed Kroger Product Search data to a JSON file for each ingredient
    const outputFileName = `${ingredient.food}_prices.json`;
    await writeFile(
      outputFileName,
      JSON.stringify({ data: processedData }, null, 2)
    );
    console.log(
      `Processed product data for ${ingredient.food} written to ${outputFileName}`
    );
  } catch (error) {
    console.error(
      `Error fetching or writing Kroger Product Search data for ${ingredient.food}:`,
      error.message
    );
  }
}

// Process each ingredient
async function processIngredients() {
  for (const ingredient of ingredientsList) {
    await fetchAndWriteKrogerProductData(ingredient);
  }
}

// Call the function to process ingredients
processIngredients();
