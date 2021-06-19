/** @format */

const express = require('express')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

require('../DB/connection')
const Order = require('../Modal/orderScheme')

router.get('/checkout', authenticate, (req, res) => {
	res.send(req.rootUser)
})

router.post('/checkout', authenticate, async (req, res) => {
	const { name, contact, address, userId, cartItems } = req.body

	try {
		const new_order = new Order({ name, contact, address, userId, cartItems })
		const success = await new_order.save()
		if (success) {
			return res.status(201).json({ message: 'order successfully placed' })
		} else {
			return res
				.status(422)
				.json({ message: 'order not placed Some error occured' })
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
