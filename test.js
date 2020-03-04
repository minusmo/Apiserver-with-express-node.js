const { calendarModel } = require("./Schema");
const mongoose = require("mongoose");

const atlasUri =
  "mongodb+srv://superuser:on8SkrvCS4Ps5jCs@clusterone-svz1y.gcp.mongodb.net/musicapp?retryWrites=true&w=majority";

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected!");
});

calendarModel.find({ artist: "younha" }, (err, docs) => {
  if (err) throw err;

  console.log(docs);
});
