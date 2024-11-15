// https://developer.spotify.com/documentation/web-api/reference/get-playlist

var express = require("express");
var router = express.Router();

var { makeSpotifyRequest } = require("../modules/spotifyClient");

router.get("/", async function (req, res, next) {
  const { playlist_id } = req.query;

  if (!playlist_id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const endpoint = `playlists/${encodeURIComponent(playlist_id)}`;

    const results = await makeSpotifyRequest(endpoint);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
