var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var albumsRouter = require("./routes/albums");
var analyzerRouter = require("./routes/analyzer");
var artistsRouter = require("./routes/artists");
var lyricsRouter = require("./routes/lyrics");
var playlistsRouter = require("./routes/playlists");
var searchRouter = require("./routes/search");
var tracksRouter = require("./routes/tracks");
var meRouter = require("./routes/me");
var loginRouter = require("./routes/login");
var callbackRouter = require("./routes/callback");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Apply CORS middleware here, before defining routes
app.use(cors({ origin: process.env.DOMAIN }));

// Define routes
app.use("/", indexRouter);
app.use("/albums", albumsRouter);
app.use("/analyzer", analyzerRouter);
app.use("/artists", artistsRouter);
app.use("/lyrics", lyricsRouter);
app.use("/playlists", playlistsRouter);
app.use("/search", searchRouter);
app.use("/tracks", tracksRouter);
app.use("/me", meRouter);
app.use("/login", loginRouter);
app.use("/callback", callbackRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
