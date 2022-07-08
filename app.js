const express = require("express");

const { getTopics } = require("./controllers/controller.js");
const { getArticles } = require("./controllers/controller.js");
const { getArticleWithID } = require("./controllers/controller.js");
const { patchArticleWithID } = require("./controllers/controller.js");
const { getUsers } = require("./controllers/controller.js");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleWithID);
app.patch("/api/articles/:article_id", patchArticleWithID);
app.get("/api/users", getUsers);
app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path does not exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ message: "bad request" });
});
module.exports = app;
