/** @format */

import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ cartItems, userLoggedIn, setUserLoggedIn }) => {
	const totalQuantity = cartItems.reduce((acc, cur) => acc + cur.quantity, 0)

	const callAboutPage = async () => {
		try {
			const res = await fetch('/account', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})

			if (res.status === 200) {
				setUserLoggedIn(true)
			} else {
				const error = new Error(res.error)
				throw error
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		callAboutPage()
	})

	return (
		<div>
			<nav
				className='navbar navbar-expand-lg navbar-light bg-warning'
				style={{
					position: 'fixed',
					top: '0px',
					width: '100%',
					zIndex: '1',
				}}>
				<NavLink className='navbar-brand' to='/'>
					NFC
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item active'>
							<NavLink className='nav-link' to='/'>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/contact'>
								Contact Us
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/account'>
								Account
							</NavLink>
						</li>
						{userLoggedIn ? (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/logout'>
									Logout
								</NavLink>
							</li>
						) : (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/login'>
									Login
								</NavLink>
							</li>
						)}
						<li className='nav-item'>
							<NavLink
								className='nav-link btn btn-outline-light'
								to='/cart'
								style={{
									borderRadius: '10px',
								}}>
								Cart({totalQuantity})
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
