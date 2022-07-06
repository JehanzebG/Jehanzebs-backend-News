const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((topic) => {
    return topic.rows;
  });
};
exports.selectArticles = () => {
  return db.query("SELECT * FROM articles;").then((article) => {
    return article.rows;
  });
};
