const { model, Schema } = require('mongoose');

const paymentSchema = new Schema({
	status: String,
	item: String,
	username: String,
	itemPid: {
		type: Schema.Types.ObjectId,
		ref: 'orders'
	}
});

module.exports = model('Payment', paymentSchema);
