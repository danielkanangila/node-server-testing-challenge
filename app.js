const express = require("express");
const cors = require("cors");
const recipesRouter = require("./recipes/recipe-router");

const app = express();
app.use(cors());

app.use("/api", recipesRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "An error occurred." });
});

module.exports = app;
