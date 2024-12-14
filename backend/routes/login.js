const express = require("express");
const router = express.Router();
const querystring = require("querystring");
require("dotenv").config(); // load .env variables

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

router.get("/", function (req, res, next) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.FRONTEND_URI + "/callback",
        state: state,
      })
  );
});

module.exports = router;
