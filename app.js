const express = require("express");

const { getTopics } = require("./controllers/controller.js");
const { getArticles } = require("./controllers/controller.js");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path does not exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send();
});
module.exports = app;
