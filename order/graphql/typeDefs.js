const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		orders: [Order]!
		createdAt: String!
	}

	type Order {
		id: ID!
		item: String!
		user: String!
		username: String!
		status: String!
		createdAt: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Query {
		getUsers: [User]
		getUser(userId: ID!): User
		getOrders: [Order]
		getOrder(orderId: ID!): Order
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createOrder(item: String!): Order!
		deleteOrder(orderId: ID!): String!
	}
`;
