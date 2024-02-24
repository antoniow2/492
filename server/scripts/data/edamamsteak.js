import fetch from 'node-fetch';
import fs from 'fs';

const appId = 'c4d66932';
const appKey = '0d6eaf84d7be263ee293b9209c669219';
const query = 'steak';

const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;
const inputFile = 'steak_data.json';
const outputFile = 'steak_recipes.json';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.hits.map(hit => {
      const { recipe } = hit;
      const { label, url, ingredients, ...rest } = recipe;
      return { label, url, ingredients, ...rest };
    });
  } catch (error) {
    console.error('Error fetching data from Edamam API:', error);
    throw error;
  }
}

function filterFields(recipe) {
  delete recipe.totalNutrients;
  delete recipe.digest;
  delete recipe.totalDaily;
  return recipe;
}

async function processData() {
  try {
    const fetchedData = await fetchData();
    const filteredData = fetchedData.map(filterFields);
    fs.writeFileSync(outputFile, JSON.stringify(filteredData, null, 2));
    console.log('Filtering completed. Filtered data saved to', outputFile);
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

processData();
