const { ObjectId } = require("mongodb");
const { server } = require("../../orchestrator/app");

// start();
let user_id;

it("login - should validate user info correctly", async () => {
  const response = await server.executeOperation({
    mutation: `mutation loginUser($payload: RegisterForm) {
        loginUser(payload: $payload) :Response {

        }
      }`,
    variables: {
      payload: {
        email: "nana@gmail.com",
        password: "nama123",
        username: "nana",
      },
    },
  });
  console.log(response.body.singleResult, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("login - login without email", async () => {
  const response = await server.executeOperation({
    query: `query loginUser($payload: RegisterForm) {
        loginUser(payload: $payload) 
      }`,
    variables: {
      payload: {
        email: null,
        password: "nama123",
        username: "nama",
      },
    },
  });
  // console.log(response, "<<<");
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("login - login without password", async () => {
  const response = await server.executeOperation({
    query: `query loginUser($payload: RegisterForm) {
        loginUser(payload: $payload) 
      }`,
    variables: {
      payload: {
        email: "nama@gmail.com",
        password: null,
        username: "nama",
      },
    },
  });
  // console.log(response, "<<<");
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get user - get user id", async () => {
  const response = await server.executeOperation({
    query: `query getUserById($user_id: ID) {
        getUserById(user_id: $user_id) 
      }`,
    variables: {
      user_id: {
        _id: ObjectId(user_id),
      },
    },
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get user - get user without id", async () => {
  const response = await server.executeOperation({
    query: `query getUserById($user_id: ID) {
        getUserById(user_id: $user_id) 
      }`,
    variables: {
      user_id: {
        _id: null,
      },
    },
  });
  // console.log(response, "<<<");
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("register - add new users", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: "nama",
        email: "nama@gmail.com",
        password: "nama123",
        phoneNumber: "08156156362",
        address: "jakarta",
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("register - add new users without username", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: null,
        email: "nama@gmail.com",
        password: "nama123",
        phoneNumber: "08156156362",
        address: "jakarta",
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});
it("register - add new users without email", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: "nama",
        email: null,
        password: "nama123",
        phoneNumber: "08156156362",
        address: "jakarta",
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});
it("register - add new users without password", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: "nama",
        email: "nama@gmail.com",
        password: null,
        phoneNumber: "08156156362",
        address: "jakarta",
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});
it("register - add new users without phoneNumber", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: "nama",
        email: "nama@gmail.com",
        password: "nama123",
        phoneNumber: null,
        address: "jakarta",
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});
it("register - add new users without address", async () => {
  const response = await server.executeOperation({
    mutation: `mutation registerUser($payload: RegisterForm){
      registerUser(payload: $payload)
    }`,
    variables: {
      payload: {
        username: "nama",
        email: "nama@gmail.com",
        password: "nama123",
        phoneNumber: "08156156362",
        address: null,
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("delete - delete user by id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation deleteUser($user_id: ID){
      deleteUser(user_id: $user_id)
    }`,
    variables: {
      user_id: {
        _id: 109839274824,
      },
    },
  });
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("delete - delete user without id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation deleteUser($user_id: ID){
      deleteUser(user_id: $user_id)
    }`,
    variables: {
      user_id: {
        _id: null,
      },
    },
  });
  expect(response.body.singleResult.errors).toBeTruthy();
});
