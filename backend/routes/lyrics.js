// https://docs.genius.com/#search-h2

const axios = require("axios");
const cheerio = require("cheerio");

var express = require("express");
var router = express.Router();

const { makeGeniusRequest } = require("../modules/geniusClient");

router.get("/", async function (req, res, next) {
  const { q } = req.query;

  if (!q) {
    return res
      .status(400)
      .json({ error: "Search query parameter is required" });
  }

  try {
    const endpoint = `search?q=${encodeURIComponent(q)}`;

    const results = await makeGeniusRequest(endpoint);
    console.log(results);

    // Todo: make song selective?
    const song = results.response.hits[0].result;
    const songUrl = song.url;

    const lyrics = await getLyrics(songUrl);

    console.log(lyrics);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Todo: Format lyrics
function getLyrics(songUrl) {
  return axios.get(songUrl).then((response) => {
    const $ = cheerio.load(response.data);
    const lyrics =
      $(".lyrics").text().trim() || $("[data-lyrics-container]").text().trim();
    return lyrics;
  });
}

module.exports = router;
