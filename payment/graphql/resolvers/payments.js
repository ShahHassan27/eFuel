const { AuthenticationError, UserInputError } = require('apollo-server');

const Payment = require('../../models/Payment');
const Order = require('../../models/Order');

module.exports = {
	Query: {
		async getPayments() {
			try {
				const payments = await Payment.find().sort({ createdAt: -1 });
				return payments;
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		payment: async (_, { orderId }, context) => {
			const defaultStatus = [ 'Confirmed', 'Declined' ];

			const randomNumber = (min, max) => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			};

			const statusBody = defaultStatus[randomNumber(0, 1)];

			const order = await Order.findById(orderId);

			const newPayment = new Payment({
				status: statusBody,
				item: order.item,
				username: order.username,
				itemPid: order._id
			});

			const paymentStatus = await newPayment.save();

			if (order) {
				order.status = statusBody;
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
