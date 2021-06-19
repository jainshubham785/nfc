/** @format */

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const Order = require('../Modal/orderScheme')

router.get('/indOrder', authenticate, async (req, res) => {
	console.log('hello i am order Route')
	const userData = req.rootUser

	const userId = userData._id

	try {
		const orders = await Order.find({ userId: userId })
		res.send(orders)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
