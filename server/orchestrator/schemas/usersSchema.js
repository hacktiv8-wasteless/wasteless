const Users = require("../services/users");

const typeDefs = `#graphql
	type User {
    id:String
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

  type Invoice {
    external_id:String
    totalPrice:Int
    invoice_url:String
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
	getUserById(userId:ID):User
  }
  
  type Mutation {
    registerUser(userPayload:userPayload):Response
	loginUser(userPayload:userPayload):Response
	deleteUser(userId:ID):Response
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
		getUserById: async (_, { userId }) => {
			try {
				const { data } = await Users.get(`/users/${userId}`);

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

				const { data } = await Users.post(`/users/login`, { email, password });

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		deleteUser: async (_, { userId }) => {
			try {
				const { data } = await Users.delete(`/users/${userId}`);

				return { message: "User Deleted successfully" };
			} catch (error) {
				console.log(error);
			}
		},
		createInvoice: async (_, { balance }) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await Users.post(
					"/topup",
					{ balance },
					{
						headers: {
							access_token: context.token,
						},
					}
				);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		payInvoice: async (_, { transactionPayload }) => {
			try {
				if (!context.user || !context.token) throw { error: "Invalid access" };
				const { data } = await Users.post(
					"/topup",
					{ balance },
					{
						headers: {
							access_token: context.token,
						},
					}
				);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
