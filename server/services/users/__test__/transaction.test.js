const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

jest.setTimeout(10000);

let user_access_token = null;

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "kareenwijaya",
      email: "karen_wijaya@gmail.com",
      password: "karin123",
      address: "jakarta",
      phoneNumber: "081234832132",
    });
    user_access_token = signToken({ id: user.id });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
describe("Transaction Routes Test", () => {
  describe("POST /transaction - create new transaction customer", () => {
    test("201 Success added transaction", async () => {
      const resAuth = await request(app).post("/users/login").send({
        email: "karen_wijaya@gmail.com",
        password: "karin123",
      });
      console.log(resAuth, "<<<<");
      const response = await request(app)
        .post("/transaction")
        .send({
          totalPrice: 150000,
        })
        .set({ access_token: resAuth.body.access_token });
      console.log(response, "<-- ini response");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      //   expect(body).toHaveProperty("message", expect.any(String));
    });
  });
});
