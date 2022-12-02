const { start, server } = require("../app");

start();

it("get all category - read all category", async () => {
  const response = await server.executeOperation({
    query: `query getAllCategories($Category) {
          getAllCategories(Category: $Category)
        }`,
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get category by id - read category using id", async () => {
  const response = await server.executeOperation({
    query: `query getPostByCategory($category_id: ID) {
            getPostByCategory(category_id: $category_id),
          }`,
    variables: {
      category_id: {
        _id: 2,
      },
    },
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get category by id - read category without id", async () => {
  const response = await server.executeOperation({
    query: `query getPostByCategory($category_id: ID) {
              getPostByCategory(category_id: $category_id),
            }`,
    variables: {
      category_id: {
        _id: null,
      },
    },
  });
  // console.log(response, "<<<");
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("add category - add category for user", async () => {
  const response = await server.executeOperation({
    mutation: `mutation addCategory($categoryPayload: categoryPayload){
        addCategory(categoryPayload: $categoryPayload)
      }`,
    variables: {
      categoryPayload: {
        name: "Botol",
        price: 12000,
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("edit caterory - edit category for user using id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation editCategory({$categoryPayload: categoryPayload, $category_id: ID }){
          editCategory({categoryPayload: $categoryPayload, category_id: $category_id})
        }`,
    variables: {
      categoryPayload: {
        name: "Botol minum",
        price: 12000,
      },
      post_id: {
        _id: 2,
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("edit caterory - edit category for user without id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation editCategory({$categoryPayload: categoryPayload, $category_id: ID }){
            editCategory({categoryPayload: $categoryPayload, category_id: $category_id})
          }`,
    variables: {
      categoryPayload: {
        name: "Botol minum",
        price: 12000,
      },
      post_id: {
        _id: null,
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("delete category - delete category for user using id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation deleteCategory({ $category_id: ID }){
            deleteCategory({category_id: $category_id})
          }`,
    variables: {
      category_id: {
        _id: 2,
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});
