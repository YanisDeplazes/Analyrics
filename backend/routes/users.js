// https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile

var express = require("express");
var router = express.Router();

var { makeSpotifyRequest } = require("../modules/spotifyClient");

router.get("/", async function (req, res, next) {
  try {
    const endpoint = `me`;

    const results = await makeSpotifyRequest(endpoint);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
