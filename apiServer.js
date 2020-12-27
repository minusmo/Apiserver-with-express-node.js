const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const assert = require("assert");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
const { expressCspHeader, NONE, SELF, NONCE, INLINE } = require('express-csp-header');
const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: '/uploads',
//   filename: (req, file, cb) => {
//     cb(file.filename + file.filename.substring(file.filename.lastIndexOf('/') + 1))
//   }
// })
const upload = multer({ dest: 'uploads/' });

const jsonAlbumFile = fs.readFileSync("./json/allAlbumsData.json");
const jsonAlbumObj = JSON.parse(jsonAlbumFile);

const { artistsModel, calendarModel } = require("./Schema");
const { MulterError } = require("multer");
const { RSA_NO_PADDING } = require("constants");
const { nextTick } = require("process");

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
server.use(expressCspHeader({
  directives: {
      'default-src': [SELF],
      'img-src': [SELF],
      'script-src': [SELF, 'https://*', 'http://*'],
      'style-src': [INLINE],
  }
}));
server.use(express.static(__dirname + '/ggu'));

server.use("/albumsData", (req, res, next) => {
  next();
});

server.use("/artistData", (req, res, next) => {
  next();
});

server.use("/timelineData", (req, res, next) => {
  next();
});

server.set('view engine', 'ejs');
server.engine('ejs', require('ejs').renderFile);

// server.set('views', __dirname + '/GGU');

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
    dir: fs.readdirSync('uploads/')
  });
  res.end();
})

server.get('/ggu', (req, res) => {
  const options = {
    headers: { "Access-Control-Allow-Origin": "*" }
  }
  
  res.render('gguggu');
  res.end();
})

server.get('/scoreboard', (req, res) => {
  const jsonScore = fs.readFileSync('./json/scores.json');
  const scoreObj = JSON.parse(jsonScore);
  // 값 기준 정렬
  const scoreArr = [];
  for(let key in scoreObj) {
    scoreArr.push([key, scoreObj[key]]);
  }
  scoreArr.sort((a,b) => b[1] - a[1]);
  const params = { sortedScores: scoreArr };

  res.render('scoreboard', params);
  res.end();
})

server.post('/updatescore/:id/:score', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id, score } = req.params;
  const jsonScore = fs.readFileSync('./json/scores.json');
  const scoreObj = JSON.parse(jsonScore);

  scoreObj[id] = score;

  fs.writeFileSync('./json/scores.json', JSON.stringify(scoreObj));
  res.send('scoreboard updated!');
  res.end();
})

server.listen(port, () => {
  console.log("Now listening on " + port);
  // console.log(__dirname);
});