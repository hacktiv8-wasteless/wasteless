const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const server = new ApolloServer({
	typeDefs: [],
	resolvers: [],
});

startStandaloneServer(server, {
	listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});