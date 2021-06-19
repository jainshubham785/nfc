/** @format */

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout = ({ setUserLoggedIn }) => {
	const history = useHistory()

	const logout = async () => {
		console.log('logout')
		try {
			const res = await fetch('/logout', {
				method: 'GET',
				headers: {
					Accept: 'Application/json',
					'Content-Type': 'Application/json',
				},
				Credential: 'include',
			})

			if (res.status === 200) {
				setUserLoggedIn(false)
				history.push('/login', { replace: true })
			} else {
				const error = new Error(res.error)
				throw error
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		logout()
	})

	return <div style={{ marginTop: '60px', minHeight: '600px' }}></div>
}

export default Logout
