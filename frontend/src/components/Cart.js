/** @format */

import React from "react"
import { NavLink } from "react-router-dom"

const Cart = ({ cartItems, addItemToCart, removeItemFromCart }) => {
	const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)

	return (
		<div
			className='container'
			style={{ minHeight: "450px", marginTop: "60px" }}
		>
			{cartItems.length === 0 ? (
				<h1 className='text-center'>Your Cart is empty</h1>
			) : (
				<div>
					{/* <h1 className='text-center'>Your Cart</h1> */}
					<table className='table table-borderless mt-4'>
						<thead>
							<tr className='table-secondary'>
								<th>Name</th>
								<th>Category</th>
								<th>Quantity</th>
								<th>Rate</th>
								<th>Total Price</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>{item.category}</td>
										<td>
											<button
												className='btn btn-danger'
												style={{ width: "30px" }}
												onClick={() => removeItemFromCart(item)}
											>
												-
											</button>
											<input
												type='text'
												className='text-center'
												style={{ width: "30px" }}
												value={item.quantity}
												disabled
											/>
											{/* <span className="text-center" style={{width:"30px"}}>{item.quantity}</span> */}
											<button
												className='btn btn-success'
												style={{ width: "30px" }}
												onClick={() => addItemToCart(item, false)}
											>
												+
											</button>
										</td>
										<td>&#8377; {item.price}</td>
										<td>&#8377; {item.quantity * item.price}</td>
									</tr>
								)
							})}
						</tbody>
						<tfoot>
							<tr className='table-secondary'>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<th>&#8377; {totalPrice}</th>
							</tr>
						</tfoot>
					</table>
					<div className='d-flex justify-content-center'>
						<NavLink to='/checkout' className='btn btn-success'>
							Procced to checkOut
						</NavLink>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
