const { start, server } = require("../app");

start();
it("login - should validate user info correctly", async () => {
  const response = await server.executeOperation({
    query: `query loginUser($payload: RegisterForm) {
        loginUser(payload: $payload) 
      }`,
    variables: {
      payload: {
        email: "nama@gmail.com",
        password: "nama123",
        username: "nama",
      },
    },
  });
  console.log(response, "<<<");
  expect(response).toBeTruthy();
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
  console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});
