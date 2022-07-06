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
exports.selectArticleWithID = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles 
    WHERE articles.article_id = $1`,
      [article_id]
    )
    .then((article) => {
      return article.rows[0];
    });
};
