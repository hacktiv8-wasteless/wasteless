const { ObjectId } = require("mongodb");
const { getPosts } = require("../config/mongo");

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
		getAllPosts: async () => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
				const posts = await postCollection.find().toArray();

				return posts;
			} catch (error) {
				console.log(error);
			}
		},
		getPostByCategory: async (_, { category_id }) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
				const posts = await postCollection
					.find({ category_id: ObjectId(category_id) })
					.toArray();

				return posts;
			} catch (error) {
				console.log(error);
			}
		},
		getPostById: async (_, { post_id }) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
				const post = await postCollection.findOne({ _id: ObjectId(post_id) });

				return posts;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		addPost: async () => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
			} catch (error) {
				console.log(error);
			}
		},
        editPost: async () => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
			} catch (error) {
				console.log(error);
			}
		},
        deletePost: async () => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const postCollection = await getPosts();
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
