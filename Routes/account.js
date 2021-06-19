/** @format */

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

require('../DB/connection')

router.get('/account', authenticate, (req, res) => {
	res.send(req.rootUser)
})

module.exports = router
