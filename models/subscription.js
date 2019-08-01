const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  plan: String,
  amount: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  active: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  created_at: {
    type: String,
    default: moment().format("DD-MM-YYYY")
  }
});

module.exports = mongoose.model("Media", MediaSchema);
