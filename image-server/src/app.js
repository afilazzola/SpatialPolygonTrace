const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(cors());
app.use(express.json());

app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "/../images/Skywatch01.png"));
});

app.get("/api", (req, res) => {
  res.json({
    message: "Image server is running",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
