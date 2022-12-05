const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	process.env.MONGO_URL ||
	"mongodb+srv://ionnotion:Huehuebrbr1992+@ionnotion.36yjwex.mongodb.net/?retryWrites=true&w=majority";
// "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

let options;

if (process.env.NODE_ENV !== "test") {
	options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	};
} else {
	options = {};
}

const client = new MongoClient(uri, options);
const testClient = new MongoClient(
	"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
);

let db = null;
let postCollection = null;
let categoryCollection = null;

const mongoConnect = async (env) => {
	try {
		if (env === "test") {
			console.log("test")
			await testClient.connect();
		} else {
			console.log("bukan test")
			await client.connect();
		}

		const database = client.db("Wasteless");
		const posts = database.collection("Posts");
		const categories = database.collection("Category");

		db = database;
		postCollection = posts;
		categoryCollection = categories;
	} catch (error) {
		console.log(error);
	}
};

const getDatabase = () => {
	return db;
};

const getPosts = () => {
	return postCollection;
};

const getCategories = () => {
	return categoryCollection;
};

module.exports = {
	mongoConnect,
	getDatabase,
	getPosts,
	getCategories,
};
