const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mongoConnect } = require("./config/mongo");
const userSchema = require("./schemas/usersSchema");

const schema = makeExecutableSchema({
	typeDefs: [userSchema.typeDefs],
	resolvers: [userSchema.resolvers],
});

const server = new ApolloServer({ schema });

async function start(env) {
	await mongoConnect(env);
	startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 },
		context: async ({ req }) => {
			const token = req.headers.authorization || "";
			return { token };
		},
	}).then(({ url }) => {
		console.log(`🚀  Server ready at: ${url}`);
	});
};

start("dev")

module.exports = start