const App = require("../services/app");

const typeDefs = `#graphql
	type Category {
    _id:ID
    name:String!
    price:Int
  }
  input categoryPayload {
    name:String
    price:Int
  }
  type Query {
    getAllCategories:[Category]
    getCategoryById(category_id:ID):Category
  }
  type Mutation {
    addCategory(categoryPayload:categoryPayload):Response
    editCategory(category_id:ID,categoryPayload:categoryPayload):Response
    deleteCategory(category_id:ID):Response
   }
`;

const resolvers = {
	Query: {
		getAllCategories: async () => {
			try {
				const { data } = App.get("/categories");

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getCategoryById: async (_, { category_id }) => {
			try {
				const { data } = App.get(`/categories/${category_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		addCategory: async (_, { categoryPayload }) => {
			const { name, price } = categoryPayload;
			try {
				const { data } = App.post(`/categories`, { name, price });

				return { message: "Category added succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
		editCategory: async (_, { category_id, categoryPayload }) => {
      const { name, price } = categoryPayload;
			try {
        const { data } = App.put(`/categories/${category_id}`, { name, price });

				return { message: "Category edited succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
		deleteCategory: async (_, { category_id }) => {
			try {
        const { data } = App.delete(`/categories/${category_id}`);

				return { message: "Category deleted succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
