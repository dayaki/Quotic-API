const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MosqueSchema = new Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now()
  },
  created_at: {
    type: String,
    default: moment().format("DD-MM-YYYY")
  }
});

module.exports = mongoose.model("Mosque", MosqueSchema);
