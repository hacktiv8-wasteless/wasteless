const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
	constraintDirectiveTypeDefs,
	createApolloQueryValidationPlugin,
} = require("graphql-constraint-directive");
const { mongoConnect } = require("./config/mongo");
const { verifyToken } = require("./helper/jwt");
const userSchema = require("./schemas/usersSchema");
const categorySchema = require("./schemas/categoriesSchema");

let schema = makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, userSchema.typeDefs, categorySchema.typeDefs],
	resolvers: [userSchema.resolvers, categorySchema.resolvers],
});

const server = new ApolloServer({
	schema,
	plugin: [createApolloQueryValidationPlugin({ schema })],
});

async function start(env) {
	await mongoConnect(env);
	startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 },
		context: async ({ req }) => {
			const token = req.headers.authorization || "";
			let user = "";
			if (token) {
				user = verifyToken(token);
			}
			return { token, user };
		},
	}).then(({ url }) => {
		console.log(`🚀  Server ready at: ${url}`);
	});
}

start("dev");
module.exports = start;
