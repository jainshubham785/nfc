/** @format */

import React from 'react'

const OrdersCard = ({ order }) => {
	const total_quantity = order.cartItems.reduce((a, c) => a + c.quantity, 0)
	const total_price = order.cartItems.reduce(
		(a, c) => a + c.quantity * c.price,
		0
	)
	const delivery_charges = total_price > 499 ? 0 : 20
	const total_amount = total_price + delivery_charges

	return (
		<div
			className='d-flex justify-content-around mt-4 shadow'
			style={{
				border: '2px solid grey',
				borderRadius: '10px',
			}}>
			<div className='p-4' style={{ width: '300px' }}>
				<p>{order.name}</p>
				<p>{order.contact}</p>
				<p>{order.address}</p>
				<p>{`${new Date(order.date)}`}</p>
			</div>
			<div className='p-4'>
				<table className='table-sm'>
					{order.cartItems.map(item => {
						return (
							<tr>
								<td>{item.name}</td>
								<td>X</td>
								<td>{item.quantity}</td>
								<td>&#8377; {item.price * item.quantity}</td>
							</tr>
						)
					})}
					<hr />
					<tr>
						<td>Price ({total_quantity} items)</td>
						<td></td>
						<td></td>
						<td>&#8377; {total_price}</td>
					</tr>
					<tr>
						<td>Delivery Charges</td>
						<td></td>
						<td></td>
						<td>&#8377; {delivery_charges}</td>
					</tr>
					<hr />
					<tr>
						<td>Total Amount</td>
						<td></td>
						<td></td>
						<td>&#8377; {total_amount}</td>
					</tr>
				</table>
			</div>
		</div>
	)
}

export default OrdersCard
