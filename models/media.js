const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let moment = require("moment");

const MediaSchema = new Schema({
  title: String,
  text: String,
  slug: String,
  url: String,
  thumbnail: String,
  type: String,
  likes: Number,
  views: Number,
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  category: String,
  categories: [
    {
      type: String
    }
  ],
  comments: [
    {
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: String,
      posted_at: {
        type: Date,
        default: moment()
      }
    }
  ],
  // likes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User"
  //   }
  // ],
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  created_at: {
    type: String,
    default: moment().format("DD-MM-YYYY")
  }
});

module.exports = mongoose.model("Media", MediaSchema);
