const App = require("../services/app");
const redis = require("../config/redis");

const typeDefs = `#graphql
	type Post {
    _id:ID
    giver_id:ID!
    taker_id:ID
    category_id:ID!
    title:String!
    description:String!
    mainImage:String!
    quantity:Int
    lat:Int
    long:Int
    status:String
    }

  input postPayload {
    category_id:ID
    title:String
    description:String
    mainImage:String
    quantity:Int
    lat:Int
    long:Int
    status:String
  }

  type Query {
    getAllPosts:[Post]
    getPostByCategory(category_id:ID):[Post]
    getPostById(post_id:ID):Post
  }

  type Mutation {
    addPost(postPayload:postPayload):Response
    editPost(postPayload:postPayload,post_id:ID):Response
    deletePost(post_id:ID):Response
   }
`;

const resolvers = {
	Query: {
		getAllPosts: async (_, __, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				// console.log(context.token);

				// redis.del("Posts")
				const cacheData = await redis.get("Posts");

				if (cacheData) {
					return JSON.parse(cacheData);
				}

				const { data } = await App.get("/posts", {
					headers: {
						access_token: context.token,
					},
				});

				await redis.set("Posts", JSON.stringify(data));


				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getPostByCategory: async (_, { category_id }, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await App.get(`/posts?category_id=${category_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getPostById: async (_, { post_id }, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await App.get(`/posts/${post_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},

	Mutation: {
		addPost: async (_, { postPayload }, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await App.post(
					`/posts`,
					{ ...postPayload, status: "pending" },
					{
						headers: {
							access_token: context.token,
						},
					}
				);
				redis.del("Posts")

				return { message: "Add Post Succesful!" };
			} catch (error) {
				console.log(error);
			}
		},

		editPost: async (_, { post_id, postPayload }, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				console.log(context.user);
				const { data } = await App.put(`/posts/${post_id}`, { ...postPayload });

				redis.del("Posts")


				return { message: "Edit Post Succesful!" };
			} catch (error) {
				console.log(error);
			}
		},

		deletePost: async (_, { post_id }, context) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await App.delete(`/posts/${post_id}`);

				redis.del("Posts")

				return { message: "Delete Post Succesful!" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
