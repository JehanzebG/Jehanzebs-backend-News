const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET: /api/topics", () => {
  test("200: an array of all the topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("status 404: returns an error when user asks for wrong path", () => {
    return request(app)
      .get("/api/topikkk")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toEqual("path does not exist");
      });
  });
});
describe("GET: /api/articles", () => {
  test("200: responds with properties from article object", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Object);
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
      });
  });
  describe("GET: /api/articles/4", () => {
    test("200: given article ID, responds with relevant article", () => {
      return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: expect.any(String),
            votes: 0,
          });
        });
    });
    test("400: gives an error when user is not on the correct path", () => {
      return request(app)
        .get("/api/articles/books")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual("bad request");
        });
    });
  });
});
