let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
var randomColor = require("randomcolor");
let Config = require("./config");

// DB connection
mongoose.connect(Config.database, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Configuration
const app = express();
const router = express.Router();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/quotes", router);

// Models
let Quote = require("./models/quote");

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
