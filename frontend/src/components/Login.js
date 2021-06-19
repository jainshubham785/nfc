/** @format */

import React, { useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'

const Login = ({ setUserLoggedIn }) => {
	const history = useHistory()
	const [loginInfo, setLoginInfo] = useState({
		contact: '',
		password: '',
	})

	const { contact, password } = loginInfo

	const handleInput = e => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contact,
				password,
			}),
		})

		const data = await res.json()

		if (res.status === 422) {
			window.alert(data.message)
			console.log(data.message)
		} else {
			window.alert(data.message)
			console.log(data.message)
			setUserLoggedIn(true)
			history.push('/')
		}
	}

	return (
		<div
			className='container my-5 d-flex justify-content-center'
			style={{ minHeight: '450px' }}>
			<div style={{ width: '500px', marginTop: '60px' }}>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Mobile No</label>
						<input
							type='tel'
							className='form-control'
							id='contact'
							placeholder='Enter Mobile No.'
							pattern='[789][0-9]{9}'
							name='contact'
							value={contact}
							onChange={handleInput}
							required
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Do not include '0' , '+91' or '-' in Number
						</small>
					</div>
					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							placeholder='Password'
							value={password}
							onChange={handleInput}
							required
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Login
					</button>
				</form>
				<p className='my-4'>
					New to NFC ? <NavLink to='/registration'> Create an Account</NavLink>
				</p>
			</div>
		</div>
	)
}

export default Login
