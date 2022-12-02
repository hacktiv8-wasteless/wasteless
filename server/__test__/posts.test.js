const { start, server } = require("../app");

// start();

it("get all post - read all post", async () => {
  const response = await server.executeOperation({
    query: `query getAllPosts($post) {
          getAllPosts(post: $post), {
            context.user
            context.token
          } 
        }`,
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get category by id - read category using id", async () => {
  const response = await server.executeOperation({
    query: `query getPostByCategory($category_id: ID) {
            getPostByCategory(category_id: $category_id), {
              context.user
              context.token
            } 
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
              getPostByCategory(category_id: $category_id), {
                context.user
                context.token
              } 
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

it("get post by id - read post using id", async () => {
  const response = await server.executeOperation({
    query: `query getPostById($post_id: ID) {
              getPostById(post_id: $post_id), {
                context.user
                context.token
              } 
            }`,
    variables: {
      post_id: {
        _id: 2,
      },
    },
  });
  // console.log(response, "<<<");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("get post by id - read post without id", async () => {
  const response = await server.executeOperation({
    query: `query getPostById($post_id: ID) {
                getPostById(post_id: $post_id), {
                  context.user
                  context.token
                } 
              }`,
    variables: {
      post_id: {
        _id: null,
      },
    },
  });
  // console.log(response, "<<<");
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("add post - add post for user", async () => {
  const response = await server.executeOperation({
    mutation: `mutation addPost($postPayload: postPayload){
        addPost(postPayload: $postPayload)
      }`,
    variables: {
      postPayload: {
        category_id: 3,
        title: "botol plastik",
        description: "botol plastik aqua",
        mainImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10_6WcRvWkiovk_tYFDJWLtoXC-AuBjaoq3nmTtaQ&s",
        quantity: 3,
        lat: 0.0,
        long: 0.0,
        status: "available",
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});

it("edit post - edit post for user using id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation editPost({$postPayload: postPayload, $post_id: ID }){
          editPost({postPayload: $postPayload, post_id: $post_id})
        }`,
    variables: {
      postPayload: {
        category_id: 3,
        title: "aqua plastik",
        description: "botol plastik aqua",
        mainImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10_6WcRvWkiovk_tYFDJWLtoXC-AuBjaoq3nmTtaQ&s",
        quantity: 3,
        lat: 0.0,
        long: 0.0,
        status: "available",
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

it("edit post - edit post for user without id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation editPost({$postPayload: postPayload, $post_id: ID }){
            editPost({postPayload: $postPayload, post_id: $post_id})
          }`,
    variables: {
      postPayload: {
        category_id: 3,
        title: "aqua plastik",
        description: "botol plastik aqua",
        mainImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10_6WcRvWkiovk_tYFDJWLtoXC-AuBjaoq3nmTtaQ&s",
        quantity: 3,
        lat: 0.0,
        long: 0.0,
        status: "available",
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

it("delete post - delete post for user using id", async () => {
  const response = await server.executeOperation({
    mutation: `mutation deletePost({ $post_id: ID }){
            deletePost({post_id: $post_id})
          }`,
    variables: {
      post_id: {
        _id: 2,
      },
    },
  });
  // console.log(response.body, "<< register");
  expect(response).toBeTruthy();
  expect(response.body.singleResult.errors).toBeTruthy();
});
