var express = require("express");
var router = express.Router();

var { makeSpotifyRequest } = require("../modules/spotifyClient");

router.get("/", async function (req, res, next) {
  const { query, type } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const endpoint = `search?q=${encodeURIComponent(query)}&type=${
      type || "track"
    }&limit=10`;

    const results = await makeSpotifyRequest(endpoint);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
