const usersResolvers = require('./users');
const ordersResolvers = require('./orders');

module.exports = {
	Query: {
		...usersResolvers.Query,
		...ordersResolvers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...ordersResolvers.Mutation
	}
};
