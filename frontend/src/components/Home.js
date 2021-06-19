/** @format */

import React, { useState } from "react"
import { Menu } from "./Menu"
import ProductCard from "./ProductCard"
import "./categories.css"
import CategoryPanel from "./CategoryPanel"

const Home = ({ addItemToCart }) => {
	const [items, setItems] = useState(Menu)

	//finding the distinct categories
	const categories = [...new Set(Menu.map(item => item.category))]

	//filter products based on category name
	const filterItems = category => {
		const filteredItems = Menu.filter(item => item.category === category)
		setItems(filteredItems)
	}

	const showAllProducts = () => setItems(Menu)

	return (
		<div style={{ marginTop: "50px" }}>
			<img
				src='https://source.unsplash.com/1366x500/?food'
				alt='Home page image'
			/>
			<div className='container mt-4'>
				<h3 className='text-center mt-5 mb-5'>Choose From below Categories</h3>
				<CategoryPanel
					categories={categories}
					filterItems={filterItems}
					showAllProducts={showAllProducts}
				/>
				<div className='grid'>
					{items.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							addItemToCart={addItemToCart}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
