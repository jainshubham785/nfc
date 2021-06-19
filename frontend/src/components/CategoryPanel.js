/** @format */

import React from "react"
import "./CategoryPanel.css"

const CategoryPanel = ({ categories, filterItems, showAllProducts }) => {
	return (
		<div>
			<div className='mb-5 btnContainer d-flex justify-content-between'>
				{categories.map((categorie, index) => {
					return (
						<button
							key={index}
							className='btn btn-warning shadow my-btn'
							onClick={() => filterItems(categorie)}
						>
							{categorie}
						</button>
					)
				})}
				<button
					className='btn btn-warning shadow my-btn'
					onClick={showAllProducts}
				>
					All
				</button>
			</div>
		</div>
	)
}

export default CategoryPanel
