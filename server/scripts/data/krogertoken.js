import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const clientId = 'usc390-fbdb0ed44db8b8087dd350f5ea9ae7258333111164567317651';
const clientSecret = 'i8-ZQLNaS3xmtqPMJnpeQrfFXW_21kWjEkykAufn';

// Kroger OAuth2 token endpoint
const tokenUrl = 'https://api.kroger.com/v1/connect/oauth2/token';

// Function to fetch access token
async function fetchAccessToken() {
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=product.compact`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    throw error;
  }
}

// Example usage
fetchAccessToken()
  .then(async (accessToken) => {
    console.log('Access Token:', accessToken);

    // Write the access token to token.txt
    await writeFile('kroger_token.txt', accessToken);

    // Call other functions with the access token for Kroger API requests
  })
  .catch((error) => console.error(error));
