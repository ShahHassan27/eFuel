const { gql } = require('apollo-server');

module.exports = gql`
	type Order {
		id: ID!
		item: String!
		user: String!
		username: String!
		status: String!
	}

	type Payment {
		status: String!
		item: String!
		username: String!
	}

	type Query {
		getPayments: [Payment]!
	}

	type Mutation {
		payment(orderId: ID!): Payment!
	}

	type Subscription {
		newPayment: Order!
	}
`;
