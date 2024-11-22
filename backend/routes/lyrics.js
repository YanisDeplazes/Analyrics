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

    if (!results.response.hits.length) {
      return res.status(404).json({ error: "No results found" });
    }

    // Song und Künstler extrahieren
    const song = results.response.hits[0].result;
    const songUrl = song.url;
    const songName = song.title;
    const artistName = song.primary_artist.name;

    const lyrics = await getLyrics(songUrl);

    // Formatierte Lyrics
    const formattedLyrics = formatLyrics(lyrics);

    // Die Ausgabe als Variable speichern
    const lyricsData = {
      song: songName,
      artist: artistName,
      lyrics: formattedLyrics,
    };

    // Optional: Verarbeite die lyricsData-Variable weiter, bevor sie gesendet wird
    console.log(lyricsData); // Zum Beispiel in der Konsole ausgeben

    // Sende die Antwort als JSON
    res.json(lyricsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* // Funktion zum Extrahieren der Lyrics
function getLyrics(songUrl) {
  return axios.get(songUrl).then((response) => {
    const $ = cheerio.load(response.data);
    // Holen Sie sich den HTML-Inhalt
    const lyrics = $(".lyrics").html() || $("[data-lyrics-container]").html();

    return lyrics;
  });
}

// Funktion zum Formatieren der Lyrics in das gewünschte Format
function formatLyrics(lyrics) {
  // Entferne Abschnittsüberschriften wie [Verse 1], [Chorus] etc.
  lyrics = lyrics.replace(/\[.*?\]/g, "").trim();

  // Ersetze <br> Tags durch Zeilenumbrüche
  let lines = lyrics
    .split("<br>")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Entferne HTML-Tags aus dem Text
  lines = lines.map((line) => {
    // Verwendet cheerio, um HTML-Tags zu entfernen und nur den Text zu behalten
    const $ = cheerio.load(line);
    return { line: $.text().trim() };
  });

  // Gibt das Array mit den Zeilen zurück, jede Zeile als Objekt mit "line"
  return lines;
} */

// Funktion zum Extrahieren der Lyrics
function getLyrics(songUrl) {
  return axios.get(songUrl).then((response) => {
    const $ = cheerio.load(response.data);
    let lyrics = "";

    $("[data-lyrics-container]").each((index, element) => {
      lyrics += $(element).html();
    });

    return lyrics;
  });
}

// Funktion zum Formatieren der Lyrics in das gewünschte Format
function formatLyrics(lyrics) {
  // Entferne Abschnittsüberschriften wie [Verse 1], [Chorus] etc.
  lyrics = lyrics.replace(/\[.*?\]/g, "").trim();

  // Alle <br> Tags durch Zeilenumbrüche ersetzen
  let lines = lyrics
    .split("<br>")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Entferne HTML-Tags aus jeder Zeile
  lines = lines.map((line) => {
    const $ = cheerio.load(line);
    return { line: $.text().trim() }; // Nur den Text ohne HTML-Tags
  });

  // Gibt das Array mit den Zeilen zurück, jede Zeile als Objekt mit "line"
  return lines;
}

module.exports = router;
