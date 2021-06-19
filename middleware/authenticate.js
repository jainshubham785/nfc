/** @format */
const jwt = require('jsonwebtoken')
const User = require('../Modal/userSchema')

const authenticate = async (req, res, next) => {
	try {
		//Getting the token stored in the cookies- for this cookie parser package is required
		const token = req.cookies.jwtoken

		//Compararing that token with the Secret key , if Matched - returns the payload , else goes to catch block
		const payload = jwt.verify(token, process.env.SECRET_KEY)

		//Using the received payload and token, Finding the User with whom thers values matches
		const rootUser = await User.findOne({
			_id: payload._id,
			'tokens.token': token,
		})

		//If no User found , we throws an error
		if (!rootUser) {
			throw new Error('User not found')
		}

		// We can't directly send data to next , So we can send data through request obeject
		req.rootUser = rootUser

		// calling the next method
		next()
	} catch (err) {
		res.status(401).send('unauthorised : No token Provided')
	}
}

module.exports = authenticate
