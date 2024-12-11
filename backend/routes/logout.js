var express = require("express");
var router = express.Router();

router.get("/logout", async function (req, res) {
  try {
    // Setze den Timeout, um nach 2 Sekunden auf die Hauptseite weiterzuleiten
    setTimeout(() => {
      res.redirect("https://accounts.spotify.com/en/logout"); // Leitet den Benutzer auf die Hauptseite weiter
    }, 2000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
