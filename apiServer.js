const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const assert = require("assert");
const bodyParser = require("body-parser");

const artistsModel = require("./Schema");

const port = process.env.port || 3040;

const atlasUri =
  "mongodb+srv://superuser:on8SkrvCS4Ps5jCs@clusterone-svz1y.gcp.mongodb.net/musicapp?retryWrites=true&w=majority";

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected!");
});

// const testSchema = mongoose.Schema(
//   {
//     _id: mongoose.Types.ObjectId,
//     name: String,
//     age: Number
//   },
//   { collection: "testCol" }
// );
// const testModel = mongoose.model("test", testSchema);

// testModel
//   .find({})
//   .exec()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", function(req, res) {
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
});

server.listen(port, () => {
  console.log("Now listening on " + port);
});
