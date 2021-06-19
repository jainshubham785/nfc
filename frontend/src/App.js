/** @format */

import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Account from './components/Account'
import Contact from './components/Contact'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Registration from './components/Registration'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

import Logout from './components/Logout'

toast.configure()
function App() {
	const [cartItems, setCartItems] = useState([])
	const [userLoggedIn, setUserLoggedIn] = useState(false)

	const addItemToCart = (product, flag) => {
		const exist = cartItems.find(item => item.id === product.id)
		if (exist) {
			setCartItems(
				cartItems.map(item =>
					item.id === product.id
						? { ...exist, quantity: exist.quantity + 1 }
						: item
				)
			)
		} else {
			setCartItems([...cartItems, { ...product, quantity: 1 }])
		}
		if (flag)
			toast.success(`${product.name} is added to cart`, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1500,
				hideProgressBar: true,
			})
	}

	const removeItemFromCart = product => {
		const exist = cartItems.find(item => item.id === product.id)
		if (exist.quantity === 1) {
			setCartItems(cartItems.filter(item => item.id !== product.id))
			toast.error(`${product.name} is removed from the cart`, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1500,
				hideProgressBar: true,
			})
		} else {
			setCartItems(
				cartItems.map(item =>
					item.id === product.id
						? { ...exist, quantity: exist.quantity - 1 }
						: item
				)
			)
		}
	}
	// debugger
	return (
		<div className='App'>
			<Router>
				<Navbar
					cartItems={cartItems}
					userLoggedIn={userLoggedIn}
					setUserLoggedIn={setUserLoggedIn}
				/>
				<Route exact path='/'>
					<Home addItemToCart={addItemToCart} />
				</Route>
				<Route exact path='/contact'>
					<Contact />
				</Route>
				<Route exact path='/account'>
					<Account />
				</Route>
				<Route exact path='/login'>
					<Login setUserLoggedIn={setUserLoggedIn} />
				</Route>
				<Route exact path='/registration'>
					<Registration />
				</Route>
				<Route exact path='/cart'>
					<Cart
						cartItems={cartItems}
						addItemToCart={addItemToCart}
						removeItemFromCart={removeItemFromCart}
					/>
				</Route>
				<Route exact path='/checkout'>
					<Checkout cartItems={cartItems} setCartItems={setCartItems} />
				</Route>
				<Route exact path='/logout'>
					<Logout setUserLoggedIn={setUserLoggedIn} />
				</Route>
				<Footer />
			</Router>
		</div>
	)
}

export default App
