<<<<<<< HEAD
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODcyOTIwLCJpYXQiOjE3MDA4NzExMTUsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NzExMjA1NDkxNDcwOTcsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.NHbgO4J0dKk_GShnYTQhmAjnb7Tnmwsj4xheNg1t_q-6RcfByrDKoo6_Lm11_94oeq14F5TOoHhWj-FFF9y9Yg270_K7CXNa6VBFx8xtRmQBrg2rKix5TSv-vwW0R8A9VJ4Riu4vNATpaN7uhGAh2RMXCfC1jc5EJJto6ZYQP41XT-rGz2v7fNoXpOJ5se4HCDwxG8QbL3k8h7Qgyt8SYIijKjDR8Z5ZsEjMqMrUWdrMwRpixaMEiUtRQ9o7GP89w0Di54gQ7fZ2NTkVIxfJcKDTbOwhGDgFhxDVd-TQLeApVsvdJbolmmuXe78VWgEX-P9tKpOuMV9tbZeQnRYfCQ';
const searchTerm = 'pandan'; // Replace with your desired search term
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
    await writeFile('pandan_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to pandan_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
=======
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzAwODcyOTIwLCJpYXQiOjE3MDA4NzExMTUsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDA4NzExMjA1NDkxNDcwOTcsImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.NHbgO4J0dKk_GShnYTQhmAjnb7Tnmwsj4xheNg1t_q-6RcfByrDKoo6_Lm11_94oeq14F5TOoHhWj-FFF9y9Yg270_K7CXNa6VBFx8xtRmQBrg2rKix5TSv-vwW0R8A9VJ4Riu4vNATpaN7uhGAh2RMXCfC1jc5EJJto6ZYQP41XT-rGz2v7fNoXpOJ5se4HCDwxG8QbL3k8h7Qgyt8SYIijKjDR8Z5ZsEjMqMrUWdrMwRpixaMEiUtRQ9o7GP89w0Di54gQ7fZ2NTkVIxfJcKDTbOwhGDgFhxDVd-TQLeApVsvdJbolmmuXe78VWgEX-P9tKpOuMV9tbZeQnRYfCQ';
const searchTerm = 'pandan'; // Replace with your desired search term
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
    await writeFile('pandan_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to pandan_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
>>>>>>> da25949eef20ef26f5a8f088ccd37516004cd3ea
fetchAndWriteKrogerProductData();