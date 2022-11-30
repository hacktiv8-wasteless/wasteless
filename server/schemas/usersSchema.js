const { ObjectId } = require("mongodb");
const { getUsers } = require("../config/mongo");
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
  }

  type Appointment {
    _id:String
  }

  input RegisterForm {
    username:String
    email:String
    password:String
    phoneNumber:String
    address:String
  }

  type Query {
	getUserById(user_id:ID):User
    loginUser(payload:RegisterForm):Response
  }

  type Mutation {
    registerUser(payload:RegisterForm):Response
	deleteUser(user_id:ID):Response
  }
`;

const resolvers = {
	Query: {
		getUserById: async (_, { user_id }) => {
			try {
				const users = await getUsers();
				const user = await users.findOne({ _id: ObjectId(user_id) });

				return user;
			} catch (error) {
				console.log(error);
			}
		},
		loginUser: async (_, { payload }) => {
			try {
				const { username, email, password } = payload;

				const users = await getUsers();
				const user = await users.findOne({ email });

				if (!user) {
					throw {message: "Invalid email or password"}
				}

				if (!comparePassword(user.password, password)) {
					throw {message: "Invalid email or password"}
				}

				const access_token = signToken({ _id: user._id });

				return { message: "user found", access_token };
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		registerUser: async (_, { payload }) => {
			try {
				let { username, email, password, phoneNumber, address } = payload;
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
