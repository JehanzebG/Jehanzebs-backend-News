const express = require("express");

const { getTopics } = require("./controllers/controller.js");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path does not exist" });
});

module.exports = app;
