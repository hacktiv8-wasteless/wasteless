const { start, server } = require("../app");

// start();

it("search post by category - search post by query categories", async () => {
  const response = await server.executeOperation({
    query: `query getSearchCategory($search: String) {
            getSearchCategory(search: $search),
          }`,
    variables: {
      search: "/plastik",
    },
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});
