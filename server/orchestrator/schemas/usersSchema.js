const Users = require("../services/users");

const typeDefs = `#graphql
	type User {
    _id:String
    username:String!
    email:String!
    password:String!
    phoneNumber:String!
    address:String!
  }
  
  type Response {
    access_token:String
    message:String
	error:Boolean
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
				const { data } = await Users.get(`/users`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getUserById: async (_, { user_id }) => {
			try {
				const { data } = await Users.findOne(`/users/${user_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		registerUser: async (_, { userPayload }) => {
			try {
				let { username, email, password, phoneNumber, address } = userPayload;

				const { data } = await Users.post(`/users/register`, {
					username,
					email,
					password,
					phoneNumber,
					address,
				});

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		loginUser: async (_, { userPayload }) => {
			try {
				const { email, password } = userPayload;

				const data = await Users.post(`/users/login`, { email, password });

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		deleteUser: async (_, { user_id }) => {
			try {
				const { data } = await Users.delete(`/users/${user_id}`);

				return { message: "User Deleted successfully" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
