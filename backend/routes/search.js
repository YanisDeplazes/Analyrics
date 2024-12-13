var express = require("express");
var router = express.Router();

var { makeSpotifyRequest } = require("../modules/spotifyClient");

router.get("/", async function (req, res, next) {
  const { query, type } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Replace spaces with `+` and construct the endpoint manually
    const formattedQuery = query.replace(/ /g, "+");
    const queryType = type || "track"; // Default to track and artist if not provided
    const endpoint = `search?q=${formattedQuery}&type=${queryType}&limit=10`;

    const searchResults = await makeSpotifyRequest(endpoint);

    res.json(searchResults);
  } catch (error) {
    console.error("Error in track search with speechiness filter:", error);
    res.status(502).json({ error: error.message });
  }
});

module.exports = router;
