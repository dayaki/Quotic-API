import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
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
// const router = express.Router();
// app.use("/api", router);

// Middleware

// API ROUTES
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import mediaRoute from "./routes/media";

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/media", mediaRoute);

// Fire up server
app.listen(Config.port);
console.log(`Dragons are alive at port ${Config.port}`);
