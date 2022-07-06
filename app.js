const express = require("express");

const { getTopics } = require("./controllers/controller.js");
const { getArticles } = require("./controllers/controller.js");
const { getArticleWithID } = require("./controllers/controller.js");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleWithID);
app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path does not exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ message: "bad request" });
});
module.exports = app;
