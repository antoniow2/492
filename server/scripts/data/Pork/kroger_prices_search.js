<<<<<<< HEAD
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODc0NjA5LCJpYXQiOjE3MDA4NzI4MDQsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NzI4MDk3NDcyMDQ3MzMsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.YK7kkCHaBks0BBPPXb_RuMJeXYP50zDHrjbmHH4IASnq-GujcI20hTnCkdKr08jZwkT-crFY0VgdKvTSrAHFoqf1Byug44_uTRCB40cAWR7zaYZhe-8t9WxjPnXixDw_XPcqXxRY8MYISTbRcudZyEYRJoDWx45jJ7Ja3xu5nQ79h-6Zfg0sy-QpUYeyerDhkkqmHDiyHNGRrq-6m_agx_B3bXtn5C0U4cM8hY0RTJKHhiSkRa9eHcc-zBbd06SBVvmdgRH3gX_J3vi6DqpST4E3l9YSTMKyVHsXciElTEHG8M9bJTna152z3Ykh7Csnegyz2ZRIGHJi1A7o7gdHnQ';
const searchTerm = 'Brown Sugar'; // Replace with your desired search term
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
    await writeFile('Brown_sugar_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to brown_sugar_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
=======
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODc0NjA5LCJpYXQiOjE3MDA4NzI4MDQsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NzI4MDk3NDcyMDQ3MzMsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.YK7kkCHaBks0BBPPXb_RuMJeXYP50zDHrjbmHH4IASnq-GujcI20hTnCkdKr08jZwkT-crFY0VgdKvTSrAHFoqf1Byug44_uTRCB40cAWR7zaYZhe-8t9WxjPnXixDw_XPcqXxRY8MYISTbRcudZyEYRJoDWx45jJ7Ja3xu5nQ79h-6Zfg0sy-QpUYeyerDhkkqmHDiyHNGRrq-6m_agx_B3bXtn5C0U4cM8hY0RTJKHhiSkRa9eHcc-zBbd06SBVvmdgRH3gX_J3vi6DqpST4E3l9YSTMKyVHsXciElTEHG8M9bJTna152z3Ykh7Csnegyz2ZRIGHJi1A7o7gdHnQ';
const searchTerm = 'Brown Sugar'; // Replace with your desired search term
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
    await writeFile('Brown_sugar_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to brown_sugar_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
>>>>>>> da25949eef20ef26f5a8f088ccd37516004cd3ea
fetchAndWriteKrogerProductData();