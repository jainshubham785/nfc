/** @format */

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
	password: {
		type: String,
		required: true,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
})

userSchema.methods.generateAuthToken = async function () {
	try {
		//Generating the token using sign() method - 1st para is 'payload' which is unique identity field,
		// 2nd para is 'secreat key'
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)

		//Concatinating this token with the tokens
		this.tokens = this.tokens.concat({ token: token })

		//save the token array in database
		await this.save()

		//returning the token
		return token
	} catch (err) {
		console.log(err)
	}
}

const User = mongoose.model('user', userSchema)

module.exports = User
