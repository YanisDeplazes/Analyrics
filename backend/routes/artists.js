// https://developer.spotify.com/documentation/web-api/reference/get-an-artist

var express = require("express");
var router = express.Router();

var { makeSpotifyRequest } = require("../modules/spotifyClient");

router.get("/", async function (req, res, next) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const endpoint = `artists/${encodeURIComponent(id)}`;

    const results = await makeSpotifyRequest(endpoint);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
