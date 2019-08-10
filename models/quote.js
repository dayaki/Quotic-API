const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let moment = require("moment");

const QuoteSchema = new Schema({
  author: String,
  text: String,
  color: String,
  created_at: {
    type: String,
    default: moment().format("DD-MM-YYYY")
  }
});

module.exports = mongoose.model("Quote", QuoteSchema);
