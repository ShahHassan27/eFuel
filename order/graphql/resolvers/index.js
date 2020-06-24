const usersResolvers = require('./users');
const ordersResolvers = require('./orders');
const paymentsResolvers = require('./payments');

module.exports = {
	Query: {
		...usersResolvers.Query,
		...ordersResolvers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...ordersResolvers.Mutation,
		...paymentsResolvers.Mutation
	},
	Subscription: {
		...paymentsResolvers.Subscription
	}
};
