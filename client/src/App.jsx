import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import { ToastContainer, Slide } from "react-toastify"
import OrderTracking from "./components/OrderTracking.jsx"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
	return (
		<div>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
				transition={Slide}
			/>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/cart'
					element={<Cart />}
				/>
				<Route
					path='/checkout'
					element={<Checkout />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/email-verify'
					element={<EmailVerify />}
				/>
				<Route
					path='/reset-password'
					element={<ResetPassword />}
				/>
				<Route
					path='/order/:id'
					element={<OrderTracking />}
				/>
			</Routes>
		</div>
	)
}

export default App
