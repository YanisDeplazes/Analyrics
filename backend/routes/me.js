const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  const accessToken = req.query.access_token; // Get the token from query parameter

  if (!accessToken) {
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(response.data); // Send profile data back to the frontend
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
