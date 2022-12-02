const { ObjectId } = require("mongodb");
const { getUsers } = require("../../app/config/mongo");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");

const typeDefs = `#graphql
	type User {
    _id:String
    username:String!
    email:String!
    password:String!
    phoneNumber:String!
    address:String!
    pendingAppointment:[Appointment]
  }
  type Response {
    access_token:String
    message:String
	error:Boolean
  }
  type Appointment {
    _id:String
  }

  input userPayload {
    username:String
    email:String
    password:String
    phoneNumber:String
    address:String
  }
  
  type Query {
	getAllUsers:[User]
	getUserById(user_id:ID):User
  }
  
  type Mutation {
    registerUser(userPayload:userPayload):Response
	loginUser(userPayload:userPayload):Response
	deleteUser(user_id:ID):Response
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const usersCollection = await getUsers();
        const users = await usersCollection.find().toArray();

        return users;
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, { user_id }) => {
      try {
        const users = await getUsers();
        const user = await users.findOne({ _id: ObjectId(user_id) });

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    registerUser: async (_, { userPayload }) => {
      try {
        let { username, email, password, phoneNumber, address } = userPayload;
        password = hashPassword(password);

        const users = await getUsers();
        const result = await users.insertOne({
          username,
          email,
          password,
          phoneNumber,
          address,
        });

        return { message: "User Created successfully" };
      } catch (error) {
        console.log(error);
      }
    },
    loginUser: async (_, { userPayload }) => {
      try {
        const { username, email, password } = userPayload;

        const users = await getUsers();
        const user = await users.findOne({ email });

        if (!user) {
          throw { message: "Invalid email or password" };
        }

        if (!comparePassword(user.password, password)) {
          throw { message: "Invalid email or password" };
        }

        const access_token = signToken({ _id: user._id });

        return { message: "user found", access_token };
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, { user_id }) => {
      try {
        const users = await getUsers();
        const user = await users.deleteOne({ _id: ObjectId(user_id) });

        return { message: "user deleted" };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
