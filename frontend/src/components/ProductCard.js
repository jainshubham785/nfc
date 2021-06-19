/** @format */

import React, { useState } from "react"

const ProductCard = ({ product, addItemToCart }) => {
	const { id, name, category, image, price, description } = product
	return (
		<div className='card shadow' style={{ width: "18rem" }}>
			<img
				className='card-img-top'
				src={image}
				alt='Card image cap'
				width='280px'
				height='166px'
			/>
			<div className='card-body'>
				<h5 className='card-title'>{name}</h5>
				<p className='card-text'>{description}</p>
				<h3 className='card-text'>&#8377; {price}</h3>
				<button
					onClick={() => addItemToCart(product, true)}
					className='btn btn-primary'
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

export default ProductCard
