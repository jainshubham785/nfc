/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

toast.configure()
const Checkout = ({ cartItems, setCartItems }) => {
	const history = useHistory()
	const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0)
	const deliveryCharges = totalPrice > 499 ? 0 : 20
	const totalAmount = totalPrice + deliveryCharges

	const [userData, setUserData] = useState({})

	const getUserDetail = async () => {
		try {
			const res = await fetch('/checkout', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
			const data = await res.json()

			setUserData(data)
			console.log(data)

			if (!res.status === 200) {
				const error = new Error(res.error)
				throw error
			}
		} catch (err) {
			console.log(err)
			history.push('/login')
		}
	}
	const userId = userData._id
	const { name, contact, address } = userData

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const res = await fetch('/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId,
					name,
					contact,
					address,
					cartItems,
				}),
			})

			const data = await res.json()

			if (res.status === 201) {
				toast.success(
					'Your order is successfully placed. Redirecting you to home page',
					{
						position: toast.POSITION.TOP_CENTER,
						autoClose: 3000,
						hideProgressBar: true,
					}
				)
				setTimeout(() => {
					setCartItems([])
					history.push('/')
				}, 3000)
			} else {
				window.alert(data.message)
			}
		} catch (err) {
			console.log(err)
			history.push('/login')
		}
	}

	useEffect(() => {
		getUserDetail()
	}, [])

	const handleInput = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	return (
		<div className='container' style={{ marginTop: '60px' }}>
			{cartItems.length !== 0 ? (
				<div>
					<h1 className='text-center my-5'>Your Order Summary</h1>
					<div className='d-flex justify-content-between'>
						<div
							className='border'
							style={{
								width: '500px',
								height: '300px',
								boxShadow: '0 0 20px rgba(0, 0 , 0, 0.2)',
							}}>
							<div className='mx-4 my-4'>
								<label style={{ width: '100px' }}>Name :</label>
								<input
									style={{ width: '200px' }}
									name='name'
									value={name}
									onChange={handleInput}
								/>
								<br />
								<label style={{ width: '100px' }}>Contact No. :</label>
								<input
									type='text'
									style={{ width: '200px' }}
									name='contact'
									value={contact}
									onChange={handleInput}
								/>
								<br />
								<label style={{ width: '100px' }}>Address :</label>
								<textarea
									style={{ width: '200px' }}
									value={address}
									name='address'
									onChange={handleInput}></textarea>
								<br />
							</div>
						</div>
						<div
							className='border'
							style={{
								width: '500px',
								boxShadow: '0 0 20px rgba(0, 0 , 0, 0.2)',
							}}>
							<div className='mx-4 my-4'>
								<table className='table table-sm table-borderless'>
									{cartItems.map(item => {
										return (
											<tr>
												<td>{item.name}</td>
												<td>X</td>
												<td>{item.quantity}</td>
												<td>&#8377; {item.quantity * item.price}</td>
											</tr>
										)
									})}
									<hr style={{ background: 'grey' }} />
									<tr>
										<td>Price ({totalQuantity} items)</td>
										<td></td>
										<td></td>
										<td>&#8377; {totalPrice}</td>
									</tr>
									<tr>
										<td>Delivery Charges *</td>
										<td></td>
										<td></td>
										<td>&#8377; {deliveryCharges}</td>
									</tr>
									<p className='text-muted'>
										* (Free delivery above &#8377; 499)
									</p>
									<hr style={{ background: 'grey' }} />
									<tr>
										<td>Total Amount</td>
										<td></td>
										<td></td>
										<td>&#8377; {totalAmount}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>

					<div className='d-flex justify-content-center my-5'>
						<button className='btn btn-success' onClick={handleSubmit}>
							Order Now
						</button>
					</div>
				</div>
			) : (
				history.push('/')
			)}
		</div>
	)
}

export default Checkout
