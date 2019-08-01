import express from "express";
const route = express.Router();

// Models
import User from "../models/user";

// All users
route.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.json({ status: "Error", data: err });
    } else {
      return res.json({ status: "Success", data: users });
    }
  });
});

// Update profile
route.post("/update", (req, res) => {
  User.findByIdAndUpdate(
    req.body.user_id,
    {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone
      }
    },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(503).json("Error updating user");
      } else res.json(user);
    }
  );
});

export default route;
