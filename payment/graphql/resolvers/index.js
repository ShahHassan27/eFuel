const paymentsResolvers = require('./payments');

module.exports = {
	Query: {
		...paymentsResolvers.Query
	},
	Mutation: {
		...paymentsResolvers.Mutation
	},
	Subscription: {
		...paymentsResolvers.Subscription
	}
};
