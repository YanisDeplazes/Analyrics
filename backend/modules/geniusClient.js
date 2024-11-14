const axios = require("axios");
require("dotenv").config(); // Loads environment variables

let accessToken = null;

// Function to get a new access token using Client Credentials flow
async function getAccessToken() {
  const clientId = process.env.GENIUS_CLIENT_ID;
  const clientSecret = process.env.GENIUS_CLIENT_SECRET;

  const tokenUrl = "https://api.genius.com/oauth/token";

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    accessToken = response.data.access_token;
  } catch (error) {
    throw new Error("Error obtaining Genius access token");
  }
}

// Function to make a request to the Genius API (including search requests)
async function makeGeniusRequest(endpoint) {
  if (!accessToken) {
    await getAccessToken(); // Ensure we have a valid access token
  }

  try {
    const response = await axios.get(`https://api.genius.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Genius API request failed");
  }
}

module.exports = { getAccessToken, makeGeniusRequest };
