/** @format */

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

require('../DB/connection')
const User = require('../Modal/userSchema')

router.get('/login', (req, res) => {
	res.send('login route')
})

router.post('/login', async (req, res) => {
	const { contact, password } = req.body

	if (!contact || !password) {
		return res.status(422).json({ message: 'some fields are missing' })
	}
	try {
		const userExist = await User.findOne({ contact: contact })
		if (userExist) {
			if (userExist.password === password) {
				//Generating the token for the User who tried to login
				const token = await userExist.generateAuthToken()

				// saving the token in cookies and defining the token expiration time
				res.cookie('jwtoken', token, {
					expires: new Date(Date.now() + 2568965200),
					httpOnly: true,
				})

				return res.status(201).json({ message: 'user login successfully' })
			} else {
				return res.status(422).json({ message: 'password is wrong' })
			}
		} else {
			return res.status(422).json({ message: 'No user Found' })
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
