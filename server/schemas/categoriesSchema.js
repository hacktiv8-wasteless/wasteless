const { ObjectId } = require("mongodb");
const { getCategories } = require("../config/mongo");

const typeDefs = `#graphql
	type Category {
    _id:String
    name:String!
    price:Int
  }

  input categoryPayload {
    name:String
    price:Int
  }

  type Query {
    getAllCategories:[Category]
    getCategoryById(category_id:String):Category
  }

  type Mutation {
    addCategory(categoryPayload:categoryPayload):Response
    editCategory(category_id:String,categoryPayload:categoryPayload):Response
    deleteCategory(category_id:String):Response
   }
`;

const resolvers = {
	Query: {
		getAllCategories: async () => {
			try {
				const categoryCollection = await getCategories();
				const categories = await categoryCollection.find().toArray();

				return categories;
			} catch (error) {
				console.log(error);
			}
		},
		getCategoryById: async (_, { category_id }) => {
			try {
				const categoryCollection = await getCategories();
				const category = await categoryCollection.findOne({
					_id: ObjectId(category_id),
				});

				return category;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		addCategory: async (_, { categoryPayload }) => {
			try {
				const { name, price } = categoryPayload;
				const categoryCollection = await getCategories();
				await categoryCollection.insertOne({ name, price });

				return { message: "Category added succesfully!" };
			} catch (error) {}
		},
		editCategory: async (_, { category_id, categoryPayload }) => {
			try {
				const { name, price } = categoryPayload;
				const categoryCollection = await getCategories();
				await categoryCollection.updateOne(
					{ _id: ObjectId(category_id) },
					{ name, price }
				);

				return { message: "Category edited succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
		deleteCategory: async (_, { category_id }) => {
			try {
				const categoryCollection = await getCategories();
				await categoryCollection.destroy({ _id: ObjectId(category_id) });

				return { message: "Category deleted succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
