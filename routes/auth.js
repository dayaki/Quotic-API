import express from "express";
import bcrypt from "bcrypt-nodejs";
const route = express.Router();

// Models
import User from "../models/user";

// Login
route.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(503).json("network error");
    } else if (user === null) {
      res.json({ status: "notfound", msg: "User not found" });
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        res.json({ status: "invalid", msg: "Invalid Password" });
      } else {
        res.json({ status: "success", data: user });
      }
    }
  });
});

// Sign up
route.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.status(503).json({ status: "Error", msg: err });
    } else if (data !== null) {
      res.json({ status: "duplicate", msg: "Email is already used." });
    } else {
      let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        referral: req.body.referral,
        password: bcrypt.hashSync(req.body.password),
        photo: req.body.photo,
        onesignal: req.body.onesignal
      });

      newUser.save((err, user) => {
        if (err) {
          return res.json({ status: "error", data: err });
        }
        res.json({ status: "success", data: user });
      });
    }
  });
});

// Forgot password
route.post("/forgotpass", (req, res) => {
  const { email } = req.body;
  const temPass = Math.random()
    .toString(36)
    .substr(2, 8);

  User.findOneAndUpdate(
    { email },
    { $set: { password: bcrypt.hashSync(temPass) } },
    (err, user) => {
      if (err || user === null) {
        res.json({ status: "notfound" });
      } else {
        //sendMail(user.email, user.fname, temPass, res);
        res.json({ status: "success" });
      }
    }
  );
});

const sendMail = (email, fname, pass, res) => {
  const server = Email.server.connect({
    user: "mailer@realmofglory.org",
    password: "realmHQ01",
    host: "host51.registrar-servers.com",
    ssl: true
  });

  server.send(
    {
      from: "Ummah Mailer <mailer@realmofglory.org>",
      to: email,
      subject: "Reset Your Password",
      attachment: [
        {
          data: `<html>
              <div>
                <h3>Hello ${fname},</h3>
                <p>It looks like you have forgotten your password.</p>
                <p>Use the following temporary password within the next 24 hours to login and update your account:</p>
                <p><strong>${pass}</strong></p>
                <br />
                <p>Thank you,</p>
                <p>Ummah Team</p>
              </div>
            </html>`,
          alternative: true
        }
      ]
    },
    function(err, message) {
      // if (err) res.json({ status: "Error", msg: err });
      res.json({ status: "success", data: message });
    }
  );
};

export default route;
