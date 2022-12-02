const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URL || "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const uri = "mongodb+srv://admin:admin123@wasteless.o95t8ok.mongodb.net/?retryWrites=true&w=majority";

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

let db = null;
let userCollection = null;

const mongoConnect = async () => {
  try {
    await client.connect();

    const database = client.db("Wasteless");
    const users = database.collection("Users");

    db = database;
    userCollection = users;
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
