// Imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import Email from "emailjs";

// Config
import { secret, database, port } from "./app-config";

// DB connection
// mongoose.connect(database);

// Models
let User = require("./app/models/user");

// Variables
const app = express();
const router = express.Router();
app.use(cors());
app.options("*", cors()); // include before other routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/api", router);

router.get("/", (req, res) => {
  res.send("yeah it's working...");
});

// listen (start app with node server.js) =====================
app.listen(process.env.PORT || port);
console.log("Dragons are alive at port " + port);
