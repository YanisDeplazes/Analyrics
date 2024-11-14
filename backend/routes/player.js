var express = require("express");
var router = express.Router();
var { playTrackOnDevice } = require("../modules/spotifyClient");

router.post("/play", async function (req, res, next) {
  const { access_token, trackUri, device_id } = req.body; // device_id hinzufügen
  console.log("Access token:", access_token);
  console.log("Track URI:", trackUri);
  console.log("Device ID:", device_id);
  if (!access_token || !trackUri || !device_id) {
    return res
      .status(400)
      .json({ error: "Access token, track URI, and device ID are required" });
  }

  try {
    console.log("Playing track on device", trackUri, device_id);
    const result = await playTrackOnDevice(access_token, trackUri, device_id); // device_id übergeben
    res.json({ message: "Playback started successfully", data: result });
  } catch (error) {
    console.error("Detailed error info:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to start playback" });
  }
});

module.exports = router;
