/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import OrdersCard from './OrdersCard'

const Account = () => {
	const history = useHistory()

	const [userData, setUserData] = useState({})
	const [myOrder, setMyOrder] = useState([])

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

			const data = await res.json()

			setUserData(data)

			if (!res.status === 200) {
				const error = new Error(res.error)
				throw error
			}
		} catch (err) {
			console.log(err)
			history.push('/login')
		}
	}
	const callOrderPage = async () => {
		try {
			const res = await fetch('/indOrder', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})

			const data = await res.json()

			setMyOrder(data)

			if (!res.status === 200) {
				const error = new Error(res.error)
				throw error
			}
		} catch (err) {
			console.log(err)
			history.push('/login')
		}
	}

	useEffect(() => {
		callAboutPage()
	}, [])

	useEffect(() => {
		callOrderPage()
	}, [])

	const { _id, name, contact, address, password } = userData

	return (
		<div
			className='container'
			style={{ marginTop: '60px', minHeight: '400px' }}>
			<h1 className='text-center'>Your Profile Details</h1>
			<table className='table my-5'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Contact</th>
						<th>Address</th>
						<th>Password</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{name}</td>
						<td>{contact}</td>
						<td>{address}</td>
						<td>{password}</td>
					</tr>
				</tbody>
			</table>
			<hr />
			<h1 className='text-center'>Your Previous Orders</h1>
			<div>
				{myOrder.map(order => {
					return <OrdersCard order={order} />
				})}
			</div>
		</div>
	)
}

export default Account
