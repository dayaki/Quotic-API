const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let moment = require("moment");

const UserSchema = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  password: String,
  referral: String,
  gender: String,
  age: String,
  photo: String,
  onesignal: String,
  wallet: Number,
  sub: Boolean,
  created_at: {
    type: String,
    default: moment().format("DD-MM-YYYY")
  }
});

module.exports = mongoose.model("User", UserSchema);
