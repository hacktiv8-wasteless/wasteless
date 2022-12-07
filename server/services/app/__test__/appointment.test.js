const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../models/post");

const inputPost = () => {
  return {
    title: "Botol",
    mainImage:
      "https://i0.wp.com/gunungmaja.co.id/wp-content/uploads/2020/11/jual-botol-minuman-500ml.jpg?fit=536%2C800&ssl=1",
    description: "botol plastik ",
    quantity: 10,
    status: "available",
  };
};

beforeAll(async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterEach(async () => {
  jest.restoreAllMocks();
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("test for endpoint post", () => {
  describe("get /post", () => {
    test("get data post", async () => {
      const post = await Post.create(inputPost());
      const response = await request(app).get("/posts");
      //   console.log(response, "<<<");
      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
    test("test for failed data", async () => {
      jest
        .spyOn(Post, "find")
        .mockRejectedValue(new Error("failed to get data"));
      const response = await request(app).get("/posts");
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual("failed to get data");
    });
  });
  describe("POST /posts", () => {
    test("success add new news", async () => {
      const mockPosts = inputPost();
      const response = await request(app).post("/posts").send(mockPosts);
      expect(response.statusCode).toEqual(201);
      expect(response.body.message).toBe("Success create post");
    });
    test("error empty field title", async () => {
      const mockPosts = inputPost();
      const res = await request(app).post("/posts").send({
        description: mockPosts.description,
        mainImage: mockPosts.mainImage,
        quantity: mockPosts.quantity,
        status: mockPosts.status,
      });
      console.log(res.body, "<><>");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field description", async () => {
      const mockPosts = inputPost();
      const res = await request(app).post("/posts").send({
        title: mockPosts.title,
        mainImage: mockPosts.mainImage,
        quantity: mockPosts.quantity,
        status: mockPosts.status,
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field mainImage", async () => {
      const mockPosts = inputPost();
      const res = await request(app).post("/posts").send({
        description: mockPosts.description,
        title: mockPosts.title,
        quantity: mockPosts.quantity,
        status: mockPosts.status,
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field quantity", async () => {
      const mockPosts = inputPost();
      const res = await request(app).post("/posts").send({
        description: mockPosts.description,
        mainImage: mockPosts.mainImage,
        title: mockPosts.title,
        status: mockPosts.status,
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field status", async () => {
      const mockPosts = inputPost();
      const res = await request(app).post("/posts").send({
        description: mockPosts.description,
        mainImage: mockPosts.mainImage,
        quantity: mockPosts.quantity,
        title: mockPosts.title,
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("Failed 500", async () => {
      const mockPosts = inputPost();
      jest
        .spyOn(Post, "create")
        .mockRejectedValue(new Error("test add news error 500"));
      const res = await request(app).post("/posts").send(mockPosts);
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual("test add news error 500");
    });
  });
});
