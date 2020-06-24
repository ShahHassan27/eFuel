const { AuthenticationError, UserInputError } = require('apollo-server');

const Payment = require('../../models/Payment');
const Order = require('../../models/Order');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Mutation: {
		payment: async (_, { orderId, body }, context) => {
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError('Empty Status', {
					errors: {
						body: 'Payment status must be provided'
					}
				});
			}
			const order = await Order.findById(orderId);

			const newPayment = new Payment({
				status: body,
				order
			});

			const paymentStatus = await newPayment.save();

			if (order) {
				order.status = body;
				await order.save();
				context.pubsub.publish('NEW_PAYMENT', {
					newPayment: order
				});
				return order;
			} else throw new UserInputError('Order not found');
		}
	},
	Subscription: {
		newPayment: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_PAYMENT')
		}
	}
};
