const Users = require("../services/users");

const typeDefs = `#graphql

    type Transaction {
        payerId:Int
        payeeId:Int
        totalPrice:Int
        external_id:String
        invoice_url:String
        payment_date:Date
    }

    input transactionPayload {
        payerId:Int
        payeeId:Int
        totalPrice:Int
    }

    type Query {
	    getOutgoingTransaction(payerId:Int):[Transaction]
	    getIncomingTransaction(payeeId:Int):[Transaction]
    }

  type Mutation {
        createInvoice(transactionPayload:transactionPayload):Transaction
        payInvoice(transactionPayload:transactionPayload):Transaction
    }
`;

const resolver = {
	Query: {
		getOutgoingTransaction: (_, { payerId }) => {
			try {
                if (!context.user || !context.token) throw { error: "Invalid access" }
                const {data} = Users.get(`/transaction/outgoing/${payerId}`)

                return data
			} catch (error) {
				console.log(error);
			}
		},
		getIncomingTransaction: (_, { payeeId }) => {
			try {
                if (!context.user || !context.token) throw { error: "Invalid access" }
                const {data} = Users.get(`/transaction/incoming/${payeeId}`)

                return data
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {

	},
};
