/** @format */

const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
require('./DB/connection')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(require('./Routes/home'))
app.use(require('./Routes/registration'))
app.use(require('./Routes/login'))
app.use(require('./Routes/checkout'))
app.use(require('./Routes/account'))
app.use(require('./Routes/logout'))
app.use(require('./Routes/indOrder'))

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('frontend/build'))
}

app.listen(PORT, (req, res) => {
	console.log(`Server is running on Port ${process.env.PORT}`)
})
