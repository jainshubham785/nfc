/** @format */

const express = require('express')
const router = express.Router()

require('../DB/connection')
const User = require('../Modal/userSchema')

router.get('/registration', (req, res) => {
	res.send('this is registration route')
})

router.post('/registration', async (req, res) => {
	const { name, contact, address, password } = req.body

	if (!name || !contact || !address || !password) {
		return res.status(422).json({ message: 'some fields are missing' })
	}
	try {
		const userExist = await User.findOne({ contact: contact })
		if (userExist) {
			return res.status(422).json({ message: 'user already exist' })
		} else {
			const new_user = new User({ name, contact, address, password })

			const success = await new_user.save()
			if (success) {
				res.status(201).json({ message: 'user succesfully registered' })
			}
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
