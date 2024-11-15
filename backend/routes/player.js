// https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player

var express = require("express");
var router = express.Router();
var { makeSpotifyRequest } = require("../modules/spotifyClient");

// Route to get playback devices
router.get("/devices", async (req, res) => {
  try {
    const results = await makeSpotifyRequest("me/player/devices");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to start playback on a specified device
router.post("/play", async (req, res) => {
  const { device_id, track_uri } = req.body;

  if (!device_id || !track_uri) {
    return res
      .status(400)
      .json({ error: "Device ID and Track URI are required" });
  }

  try {
    const endpoint = `me/player/play?device_id=${encodeURIComponent(
      device_id
    )}`;
    const results = await makeSpotifyRequest(endpoint, "PUT", {
      uris: [track_uri],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
