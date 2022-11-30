const { ObjectId } = require("mongodb");
const { getUsers } = require("../config/mongo");

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
    username:String!
    email:String!
    password:String!
    phoneNumber:String!
    address:String!
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
				console.log(user_id);
				const users = await getUsers();
				console.log(users);
				const user = await users.findOne({ _id: ObjectId(user_id) });
				console.log(user);

				return user;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		registerUser: async (_, {payload}) => {
			try {
				const { username, email, password, phoneNumber, address } =
					payload;
                
				const users = await getUsers();
                const result = await users.insertOne({username,email,password,phoneNumber,address})
                return {message: "User Created successfully"}
			} catch (error) {
                console.log(error)
            }
		},
		deleteUser: (_, { user_id }) => {},
	},
};

module.exports = { typeDefs, resolvers };
