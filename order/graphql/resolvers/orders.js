const { AuthenticationError, UserInputError } = require('apollo-server');
const { createApolloFetch } = require('apollo-fetch');

const Order = require('../../models/Order');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
		async getOrders() {
			try {
				const orders = await Order.find().sort({ createdAt: -1 });
				return orders;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getOrder(_, { orderId }) {
			try {
				const order = await Order.findById(orderId);
				if (order) {
					return order;
				} else {
					throw new Error('Order not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		async createOrder(_, { item }, context) {
			const user = checkAuth(context);

			const newOrder = new Order({
				item,
				status: 'Not Confirmed',
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString()
			});
			const order = await newOrder.save();

			const fetch = createApolloFetch({
				uri: 'http://localhost:5001/'
			});

			const fetchAsync = async () => {
				await fetch({
					query: `mutation Payment($orderId: ID!) {
				payment(orderId: $orderId) {
				status
				}
			}`,
					variables: { orderId: order._id }
				}).then((res) => {
					const result = res.data.payment.status;
					statusUpdate = () => result;
				});
			};

			await fetchAsync();

			const result2 = await statusUpdate();
			console.log('This is working ' + result2);

			const owner = await User.findById(user.id);
			await owner.orders.unshift({
				itemId: order._id,
				item: order.item,
				username: order.username,
				createdAt: new Date().toISOString()
			});
			await owner.save();
			return order;
		},
		async deleteOrder(_, { orderId }, context) {
			const user = checkAuth(context);
			try {
				const order = await Order.findById(orderId);
				if (user.username === order.username) {
					await order.delete();
					return 'Order deleted successfully';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error('Error user not allowed');
			}
		}
	}
};
