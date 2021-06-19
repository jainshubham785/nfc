/** @format */

import React, { useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'

const Registration = () => {
	const history = useHistory()

	const user = {
		name: '',
		contact: '',
		address: '',
		password: '',
	}

	const [userInfo, setUserInfo] = useState(user)

	const { name, contact, address, password } = userInfo

	const handelChange = e => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const res = await fetch('/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				contact,
				address,
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

			history.push('/login')
		}
	}

	return (
		<div className='container my-5 d-flex justify-content-center'>
			<div style={{ width: '450px', marginTop: '60px' }}>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Name</label>
						<input
							type='text'
							className='form-control'
							name='name'
							placeholder='Enter Name'
							value={name}
							onChange={handelChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label>Mobile No</label>
						<input
							type='tel'
							className='form-control'
							name='contact'
							placeholder='Enter Mobile No.'
							pattern='[789][0-9]{9}'
							value={contact}
							onChange={handelChange}
							required
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Do not include '0' , '+91' or '-' in Number
						</small>
					</div>
					<div className='form-group'>
						<label>Address</label>
						<textarea
							type='text'
							className='form-control'
							name='address'
							placeholder='Enter Your Address'
							value={address}
							onChange={handelChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							name='password'
							placeholder='Password'
							value={password}
							onChange={handelChange}
							required
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Register
					</button>
				</form>
				<p className='my-4'>
					Already Have an account ? <NavLink to='/login'> Login</NavLink>
				</p>
			</div>
		</div>
	)
}

export default Registration
