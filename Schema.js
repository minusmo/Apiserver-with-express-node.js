const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const artistsSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  artist: String,
  info: {
    birth_date: mongoose.Schema.Types.String,
    height: mongoose.Schema.Types.Number,
    genre: [mongoose.Schema.Types.String],
    debut: mongoose.Schema.Types.String,
    members: [String],
    company: String,
    nickname: String,
    name: String,
    nation: String,
    official_sns: [String],
    fan_page: [String]
  },
  albums: [{ title: String }]
});
const artistsModel = mongoose.model("artist", artistsSchema);

// const monthSchema = new Schema({ title: String, date: String });

const calendarSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  artist: String,
  year: String,
  month: [{ title: String, date: String, imgsrc: String, videosrc: String }]
});

const calendarModel = mongoose.model("calendar", calendarSchema);

module.exports = { artistsModel, calendarModel };
