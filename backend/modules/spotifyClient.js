const axios = require("axios");
require("dotenv").config(); // Loads environment variables

let accessToken = null;

// Function to get a new access token using Client Credentials flow
async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      tokenUrl,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

// Function to make a request to the Spotify API (including search requests)
async function makeSpotifyRequest(endpoint) {
  if (!accessToken) {
    await getAccessToken(); // Ensure we have a valid access token
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

module.exports = { getAccessToken, makeSpotifyRequest };
