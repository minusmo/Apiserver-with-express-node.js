const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const assert = require("assert");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const jsonAlbumFile = fs.readFileSync("./json/allAlbumsData.json");
const jsonAlbumObj = JSON.parse(jsonAlbumFile);

const { artistsModel, calendarModel } = require("./Schema");
const { MulterError } = require("multer");
const { RSA_NO_PADDING } = require("constants");

const port = process.env.PORT || 3040;

const atlasUri =
  "mongodb+srv://superuser:on8SkrvCS4Ps5jCs@clusterone-svz1y.gcp.mongodb.net/musicapp?retryWrites=true&w=majority";

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected!");
});

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use("/albumsData", (req, res, next) => {
  next();
});

server.use("/artistData", (req, res, next) => {
  next();
});

server.use("/timelineData", (req, res, next) => {
  next();
});

server.post("/artistData/:id", function(req, res) {
  if (req.params.id === "mo9508") {
    res.set("Access-Control-Allow-Origin", "*");
    artistsModel
      .find({})
      .exec()
      .then(doc => {
        console.log(doc);
        res.json(doc);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.send("you are no allowed!");
  }
});

// server.get("/albumsData", function(req, res) {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.json(jsonAlbumObj);
// });

server.post("/albumsData/:id", function(req, res) {
  if (req.params.id === "mo9508") {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(jsonAlbumObj);
  } else {
    res.send("you are now allowed!");
  }
});

server.post("/timelineData/:year/:id", function(req, res) {
  if (req.params.id === "mo9508") {
    res.set("Access-Control-Allow-Origin", "*");
    calendarModel.find(
      { artist: "younha", year: req.params.year },
      (err, docs) => {
        if (err) throw err;

        res.json(docs);
      }
    );
  } else {
    res.send("you are not allowed!");
  }
});

server.post('/upload', upload.single('imgFileData1'), function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({
    headers: req.headers,
    body: req.body,
    file: req.file,
  });
  res.end();
})

server.listen(port, () => {
  console.log("Now listening on " + port);
});
