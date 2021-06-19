/** @format */

const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
	res.clearCookie('jwtoken', { path: '/' })
	res.status(200).send('user logout')
})

module.exports = router
