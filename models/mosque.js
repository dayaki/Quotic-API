const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MosqueSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  lat: String,
  lng: String,
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
