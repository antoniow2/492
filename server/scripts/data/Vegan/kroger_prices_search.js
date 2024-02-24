import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODg3OTc5LCJpYXQiOjE3MDA4ODYxNzQsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4ODYxNzk0MzEzMjEzNjQsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.Co8mVZT8gJKjHGC74o8vLsGJLASoR6AyFS-HyeoiXfGugeNJmbIeKxRTenT_9auM3ymmR23pinQpt2UnT0to5dXE3t_ykHwzTIOmI-EVjYIr-u4EE-cOLg7LrPHSdRj6yhPXTxZrEGc6HKUgzCZTadsScub0frrpXfI3uj986pbnonch6SmBRoiH_l90IZltir7YvzNeHt5TcSrYkMVTdr1uYGY7rwNI148SHKiFL1lQnC_rMzGmVbPHid4lIuFOOH3o4LPFA3TXagt-TWTVVLiCJTbOhHDZr8hOG-idjpOleu0PqJXw7_lzCxpAfILk5d9-L4rjonD_Wtvg3mRIOg';
const searchTerm = 'almond milk'; // Replace with your desired search term
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
    await writeFile('almond_milk_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to almond_milk_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
fetchAndWriteKrogerProductData();