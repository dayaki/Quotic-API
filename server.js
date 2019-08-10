import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import randomColor from "randomcolor";
import cors from "cors";
const app = express();

// Import config data
import Config from "./config";

// DB connection
mongoose.connect(Config.database, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Configuration
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
const router = express.Router();
app.use("/quotes", router);

// Models
import Quote from "./models/quote";

// Fetch all quotes
router.get("/", (req, res) => {
  Quote.find({}, (err, quotes) => {
    if (err) return res.json({ status: "error", msg: err });
    res.json({ status: "success", data: quotes });
  });
});

router.post("/", (req, res) => {
  const quote = new Quote({
    text: req.body.quote,
    author: req.body.author,
    color: randomColor({ hue: "random", luminosity: "random", count: 1 })
  });

  quote.save((err, quote) => {
    if (err) return res.json({ status: "error", msg: err });
    res.json({ status: "success", data: quote });
  });
});

// Fire up server
app.listen(Config.port);
console.log(`Dragons are alive at port ${Config.port}`);
