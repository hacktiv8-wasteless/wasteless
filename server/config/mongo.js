const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	process.env.MONGO_URL ||
	"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

let options;

if (process.env.NODE_ENV) {
	options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	};
} else {
	options = {};
}

const client = new MongoClient(uri, options);
const testClient = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")

let db = null;
let userCollection = null;

const mongoConnect = async (env) => {
	try {
		if(env === "test") {
			await testClient.connect()
		} else {
			await client.connect();
		}

		const database = client.db("Wasteless");
		const users = database.collection("Users")

		db = database;
		userCollection = users
	} catch (error) {
		console.log(error);
	}
};

const getDatabase = () => {
	return db;
};

const getUsers = () => {
	return userCollection;
};

module.exports = { mongoConnect, client, getDatabase, getUsers };
