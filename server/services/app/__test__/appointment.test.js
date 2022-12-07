const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Appointment = require("../models/appointment");

const inputSlot = () => {
  return {
    slot_time: " 7 desember 2022",
    slot_date: "7 desember 2022",
    created_at: Date.now(),
  };
};

const inputAppoinmnet = () => {
  return {
    username: "tanjung",
    email: "tanjungaa84@gmail.com",
    phoneNumber: "081234987654",
    slots: "63900b0d6015d7502743c4d8",
    postId: 1,
    created_at: Date.now(),
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

describe("test for endpoint appointment", () => {
  describe("create post /appointment/:postid", () => {
    test("get data post", async () => {
      const post = await Post.create(inputPost());
      const response = await request(app).get("/posts");
      //   console.log(response, "<<<");
      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
    test("test for failed data", async () => {
      jest
        .spyOn(Appointment, "find")
        .mockRejectedValue(new Error("failed to get data"));
      const response = await request(app).get("/posts");
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual("failed to get data");
    });
  });
  describe("create post /appointment/:postid", () => {
    test("create data post", async () => {
      const appointment = await Appointment.create(inputAppoinmnet());
      const response = await request(app).post(
        `/appointment/${appointment._id}`
      );
      // console.log(response, "<<< ini di test");
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual("success add appoinment");
    });
    test("error empty field username", async () => {
      const mockPosts = inputAppoinmnet();
      const res = await request(app).post("/appointment/1").send({
        email: mockPosts.email,
        phoneNumber: mockPosts.phoneNumber,
        slots: mockPosts.slots,
        postId: mockPosts.postId,
      });
      // console.log(res.body, "<><>");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({});
    });
    test("error empty field email", async () => {
      const mockPosts = inputAppoinmnet();
      const res = await request(app).post("/appointment/1").send({
        username: mockPosts.username,
        phoneNumber: mockPosts.phoneNumber,
        slots: mockPosts.slots,
        postId: mockPosts.postId,
      });
      // console.log(res.body, "<<<<");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({});
    });
    test.only("error empty field phone number", async () => {
      const mockPosts = inputAppoinmnet();
      const res = await request(app).post("/appointment/1").send({
        username: mockPosts.username,
        email: mockPosts.email,
        slots: mockPosts.slots,
        postId: mockPosts.postId,
      });
      console.log(res.body, "<<<<");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field slot", async () => {
      const mockPosts = inputAppoinmnet();
      const res = await request(app).post("/appointment").send({
        username: mockPosts.username,
        email: mockPosts.email,
        phoneNumber: mockPosts.phoneNumber,
        postId: mockPosts.postId,
      });
      // console.log(res.body, "<<<<");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({});
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
