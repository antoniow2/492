<<<<<<< HEAD
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODY2NjU4LCJpYXQiOjE3MDA4NjQ4NTMsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NjQ4NTg3NzUzMTEzMDMsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.ADZ5ELcljbUMRUVfpu40e7lbcVHgUE6jKbOgXgXZFJ8ZplC57384rTzcprb89Zb_OQ2mGSbCU_JNoOIEhQABJo-IYwx1Aus8EPHBEeV98AwakQY_xoxSrLMDPtBrHsM1XZX7_HCqS4mHzfy6Dhnfu8oFI-HgrVhjw7ViiQyoOWZVKjweT0noOhZJ1Q_7Et2F598Rbp-k-i2YGyP23LVzzDo6-l5wqxPmZMA5LFacAV_TpmgLwRQL3h1EkFwYcKx9k9qyQO0HRXg-P4wN763rSXtBgX567MiCPggylAJyHynJ5BlLQj2lusH95nQe_HmabF1UCpzniKGXRDzi3A8vtQ';
const searchTerm = 'whole chicken'; // Replace with your desired search term
const locationId = '01400943'; // Replace with your desired locationId

// Kroger API endpoint for product search without the brand filter
const apiUrl = `https://api.kroger.com/v1/products?filter.term=${searchTerm}&filter.locationId=${locationId}`;

// Function to fetch data from the Kroger API and write to a JSON file
async function fetchAndWriteKrogerProductData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Log the entire API response for debugging
    //console.log('API Response:', data);

    // Process the response to include only the "price" section for all brands
    const processedData = data.data.map(product => ({
      productId: product.productId,
      brand: product.brand,
      upc: product.upc,
      price: product.items.map(item => item.price),
    }));

    // Log the processed data for debugging
    //console.log('Processed Data:', processedData);

    // Write the processed Kroger Product Search data to kroger_prices.json
    await writeFile('whole_chicken_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to whole_chicken_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
=======
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODY2NjU4LCJpYXQiOjE3MDA4NjQ4NTMsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NjQ4NTg3NzUzMTEzMDMsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.ADZ5ELcljbUMRUVfpu40e7lbcVHgUE6jKbOgXgXZFJ8ZplC57384rTzcprb89Zb_OQ2mGSbCU_JNoOIEhQABJo-IYwx1Aus8EPHBEeV98AwakQY_xoxSrLMDPtBrHsM1XZX7_HCqS4mHzfy6Dhnfu8oFI-HgrVhjw7ViiQyoOWZVKjweT0noOhZJ1Q_7Et2F598Rbp-k-i2YGyP23LVzzDo6-l5wqxPmZMA5LFacAV_TpmgLwRQL3h1EkFwYcKx9k9qyQO0HRXg-P4wN763rSXtBgX567MiCPggylAJyHynJ5BlLQj2lusH95nQe_HmabF1UCpzniKGXRDzi3A8vtQ';
const searchTerm = 'whole chicken'; // Replace with your desired search term
const locationId = '01400943'; // Replace with your desired locationId

// Kroger API endpoint for product search without the brand filter
const apiUrl = `https://api.kroger.com/v1/products?filter.term=${searchTerm}&filter.locationId=${locationId}`;

// Function to fetch data from the Kroger API and write to a JSON file
async function fetchAndWriteKrogerProductData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Log the entire API response for debugging
    //console.log('API Response:', data);

    // Process the response to include only the "price" section for all brands
    const processedData = data.data.map(product => ({
      productId: product.productId,
      brand: product.brand,
      upc: product.upc,
      price: product.items.map(item => item.price),
    }));

    // Log the processed data for debugging
    //console.log('Processed Data:', processedData);

    // Write the processed Kroger Product Search data to kroger_prices.json
    await writeFile('whole_chicken_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to whole_chicken_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
>>>>>>> da25949eef20ef26f5a8f088ccd37516004cd3ea
fetchAndWriteKrogerProductData();