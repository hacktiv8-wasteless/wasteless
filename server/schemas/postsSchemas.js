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
    getAllPost:[Post]
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
	},
	Mutation: {
	},
};

module.exports = { typeDefs, resolvers };
