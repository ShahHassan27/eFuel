const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	orders: [
		{
			itemId: {
				type: Schema.Types.ObjectId,
				ref: 'orders'
			},
			item: String,
			user: String,
			username: String
		}
	],
	createdAt: String
});

module.exports = model('User', userSchema);
