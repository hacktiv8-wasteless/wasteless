const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/jwt");
const { queryInterface } = sequelize;

jest.setTimeout(1000);

let user = require("../seeders/users.json");
user.forEach((el) => {
  el.password = hashPassword(el.password);
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", user, null);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("User Routes Test", () => {
  describe("POST /register - create new user", () => {
    test("201 success - create new user", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((error, res) => {
          if (error) return done(error);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toHaveProperty(expect.any(Object));
          expect(body).toHaveProperty("message", "Create user successfully");
          return done();
        });
    });
    test("400 Failed register - should return error if username is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username cannot be empty");
          return done();
        });
    });
    test("400 Failed register - should return error if username not 6 character", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "hello",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Username must be 6 characters or longer"
          );
          return done();
        });
    });
    test("400 Failed register - should return error using user registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username is already in use");
          return done();
        });
    });
    test("400 Failed register - should return error if email null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email cannot be empty");
          return done();
        });
    });
    test("400 Failed register - should return error without email format", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc.gmail,com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Must be in email format");
          return done();
        });
    });
    test("400 Failed register - should return error using email user registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is already in use");
          return done();
        });
    });
    test("400 Failed register - should return error if password null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password cannot be empty");
          return done();
        });
    });
    test("400 Failed register - should return error if password not 6 character", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "hello",
          email: "abc@gmail.com",
          password: "12345",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Password must be 6 characters or longer"
          );
          return done();
        });
    });
    test("400 Failed register - should return error using phoneNumber user registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Phone Number is already in use"
          );
          return done();
        });
    });
    test("400 Failed register - should return error if phone number null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          address: "jakarta",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "message",
            "Phone Number cannot be empty"
          );
          return done();
        });
    });
    test("400 Failed register - should return error if address null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Address cannot be empty");
          return done();
        });
    });
  });
  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "abc@gmail.com",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });
    test("401 Failed login wrong password - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "abc@gmail.com",
          password: "abcdef",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid Email or Password");
          return done();
        });
    });
    test("401 Failed login wrong email - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "apaajah@gmail.com",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid Email or Password");
          return done();
        });
    });

    test("400 Failed login when email is null - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Email cannot be empty");
          return done();
        });
    });

    test("400 Failed login when password is null - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "hello@mail.com",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Password cannot be empty");
          return done();
        });
    });
  });
  describe("GET / - return data all user", () => {
    test("200 Success get user, return array", (done) => {
      request(app)
        .get("/users")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("email", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("GET / - return data user by id", () => {
    test("200 Success get user, return array", (done) => {
      request(app)
        .get("/users/:id")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("email", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
