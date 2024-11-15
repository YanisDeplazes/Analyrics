const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:3000/callback"; // Ensure this matches the URI in Spotify Dashboard

router.get("/", async (req, res) => {
  // Capture the authorization code and state
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (!code) {
    // If no authorization code is provided, handle the error
    return res.send("Authorization code not found.");
  }

  // Prepare the token exchange request
  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    data: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }).toString(),
  };

  try {
    // Request the access token from Spotify
    const response = await axios(authOptions);
    const accessToken = response.data.access_token;

    res.redirect(
      "http://localhost:8888/stuwe1/frontend/song-selection?" +
        querystring.stringify({ access_token: accessToken })
    );
  } catch (error) {
    console.error(
      "Error exchanging authorization code:",
      error.response?.data || error.message
    );
    res.send("Failed to exchange authorization code for access token.");
  }
});

module.exports = router;
