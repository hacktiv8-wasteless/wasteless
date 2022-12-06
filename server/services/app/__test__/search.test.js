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

describe("test for search post by title", () => {
  describe("get /search - return data by title unknown", () => {
    test("get search data post", async () => {
      const post = await Post.create(inputPost());
      const response = await request(app).get("/search?=Botol");
      console.log(response, "<<<");
      expect(response.statusCode).toEqual(500);
      //   expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

/* describe("Search Routes Test", () => {
    describe("GET /search - return data food matches by name", () => {
        test("200 Success get all foods data, return array", (done) => {
        request(server)
            .get("/search?=ayam")
            .set({ access_token: user_access_token })
            .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body[0]).toBeInstanceOf(Object);
            expect(body[0].Food).toBeInstanceOf(Array);
            done();
            })
            .catch((err) => {
            done(err);
            });
        });
    });
});
 */

//     test("400 Failed create checkout balance less than food price - should return error - Top up first", (done) => {
//       request(server)
//         .post("/checkout")
//         .send({
//           order: [
//             {
//               qty: 3,
//               FoodId: 2,
//               itemPrice: 35000,
//             },
//             {
//               qty: 2,
//               FoodId: 1,
//               itemPrice: 25000,
//             },
//           ],
//           is_delivery: "Delivery",
//           total: 155000,
//         })
//         .set({ access_token: user_access_token })
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(400);
//           expect(body).toBeInstanceOf(Object);
//           expect(body).toHaveProperty("message", expect.any(String));
//           return done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });

//     test("401 Failed create checkout with invalid token - should return error unauthorized", (done) => {
//       request(server)
//         .post("/checkout")
//         .send({})
//         .set("access_token", "ini invalid token")
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(401);
//           expect(body).toHaveProperty("message", "Invalid token");
//           return done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });

//   describe("GET /checkout - return data order food", () => {
//     test("200 Success get all checkout, return array", (done) => {
//       request(server)
//         .get("/checkout")
//         .set({ access_token: user_access_token })
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(200);
//           expect(body[0]).toBeInstanceOf(Object);
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });

//     test("401 Failed get order food with invalid token - should return error unauthorized", (done) => {
//       request(server)
//         .post("/checkout")
//         .set("access_token", "ini invalid token")
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(401);
//           expect(body).toHaveProperty("message", "Invalid token");
//           return done();
//         })
//         .catch((err) => {
//           done(err);
//         });
// });
