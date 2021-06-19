/** @format */

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	contact: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	cartItems: [
		{
			name: String,
			category: String,
			price: Number,
			quantity: Number,
		},
	],
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

const Order = mongoose.model('order', orderSchema)

module.exports = Order
