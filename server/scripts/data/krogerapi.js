import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1c2MzOTAtZmJkYjBlZDQ0ZGI4YjgwODdkZDM1MGY1ZWE5YWU3MjU4MzMzMTExMTY0NTY3MzE3NjUxIiwiZXhwIjoxNzA2NDAzNTM4LCJpYXQiOjE3MDY0MDE3MzMsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZGVkYTdjMzgtZjE2YS01ZGIzLTgzZmUtYTFjZmY2ODc0NTg2Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDY0MDE3MzgxNjAxNDgzMTksImF6cCI6InVzYzM5MC1mYmRiMGVkNDRkYjhiODA4N2RkMzUwZjVlYTlhZTcyNTgzMzMxMTExNjQ1NjczMTc2NTEifQ.ClWnuZSF_iXcF_c-4cCbz-4ZfFBAzmT_lQRcT9q-YcL7ohmHw2aavuwwgerdxDj7JyBW6eMYmslyoTcH4a6G5pQewi6c8jTRob7zC3UOtiBL5jhlSzaZUTclsQoMHrfBFnRSPxNiU2r-9OjPr94AjtA8EciPmL7-rC5DaYxoHIH9h9b1Dlc_ypvXXXJF9EEaGu2GBI7NS7s-vN71lrNPBU3lc2HQ52AHeoJYoS32NGBZdKBJvbyP-IDOIadr78SsBwkx9SnmheJUvXuis6-4RnLs2E-68bflWYTiJ3dI_t19eEJXqbQ6mNfWtjj05rJK1hQiAsjPAPwJaPB3d5rW2w'; 
const brand = 'Kroger'; // Replace with your desired brand
const searchTerm = 'vegetarian'; // Replace with your desired search term
const locationId = '01400943'; // Replace with your desired locationId

// Kroger API endpoint for product search
const apiUrl = `https://api.kroger.com/v1/products?filter.brand=${brand}&filter.term=${searchTerm}&filter.locationId=${locationId}`;

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

    // Process the response to include only the "price" section
    const processedData = data.data.map(product => ({
      productId: product.productId,
      upc: product.upc,
      price: product.items.map(item => item.price),
    }));

    // Write the processed Kroger Product Search data to chicken.json
    await writeFile('vegetarian_prices.json', JSON.stringify({ data: processedData }, null, 2));
    console.log('Processed product data written to vegetarian_prices.json');

  } catch (error) {
    console.error('Error fetching or writing Kroger Product Search data:', error.message);
  }
}

// Call the function to fetch and write product search data
fetchAndWriteKrogerProductData();
