const { model, Schema } = require('mongoose');

const paymentSchema = new Schema({
	status: String,
	order: String
});

module.exports = model('Payment', paymentSchema);
