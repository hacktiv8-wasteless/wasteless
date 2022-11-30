const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoConnect } = require("./config/mongo");
const userSchema =require("./schemas/usersSchema")
const typeDefs = `#graphql
	type User {
    _id:String
    username:String
    email:String!
    password:String!
    phoneNumber:String
    address:String
  }

  type Query {
	query1:User
  }

  type Mutation {
	mutation1:User
  }
`;

const resolvers = {
	Query: {
		query1: () => {},
	},
	Mutation: {
		mutation1: () => {},
	},
};

const server = new ApolloServer({
	typeDefs: [userSchema.typeDefs],
	resolvers: [userSchema.resolvers]
});

(async () => {
	await mongoConnect();
	startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 },
	}).then(({ url }) => {
		console.log(`🚀  Server ready at: ${url}`);
	});
})();
