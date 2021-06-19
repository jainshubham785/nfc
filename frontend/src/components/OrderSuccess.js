/** @format */

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const OrderSuccess = () => {
	const history = useHistory()

	useEffect(() => {
		setTimeout(() => history.push('/'), 3000)
	}, [])

	return (
		<div className='container' style={{ marginTop: '100px' }}>
			<h1 className='text-center'>your Order Has been Successfully placed</h1>
			<p className='text-center text-muted'>Redirecting you to Home page</p>
		</div>
	)
}

export default OrderSuccess
