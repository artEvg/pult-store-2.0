import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import { ToastContainer, Slide } from "react-toastify"
import Orders from "./pages/Orders.jsx"
import OrderTracking from "./components/OrderTracking.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import "react-toastify/dist/ReactToastify.css"
import AboutUs from "./pages/AboutUs.jsx"
import ContactUs from "./pages/ContactUs.jsx"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		checkAuth()
	}, [])

	const checkAuth = async () => {
		try {
			const token = localStorage.getItem("token")
			console.log("📍 Token найден:", !!token)

			if (!token) {
				console.log("❌ Токена нет")
				setLoading(false)
				return
			}
			
			const authResponse = await fetch(
				"http://localhost:4000/api/auth/is-auth",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
				}
			)

			console.log("📍 Статус авторизации:", authResponse.status)

			if (authResponse.ok) {
				setIsAuthenticated(true)
				console.log("✅ Пользователь аутентифицирован")

				const userResponse = await fetch(
					"http://localhost:4000/api/user/data",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						credentials: "include",
					}
				)

				console.log("📍 Статус данных пользователя:", userResponse.status)

				if (userResponse.ok) {
					const responseData = await userResponse.json()
					console.log("📍 Данные пользователя:", responseData)

					setUserData(responseData.userData)

					const userRole =
						responseData.userData?.role || localStorage.getItem("userRole")
					console.log("📍 Роль пользователя:", userRole)

					if (userRole === "admin") {
						console.log("✅ Пользователь является администратором")
						setIsAdmin(true)
					} else {
						console.log("❌ Пользователь НЕ администратор")
						setIsAdmin(false)
					}
				} else {
					console.log("❌ Ошибка при получении данных пользователя")
					setIsAdmin(false)
				}
			} else {
				console.log("❌ Ошибка авторизации")
				setIsAuthenticated(false)
				setIsAdmin(false)
			}
		} catch (error) {
			console.error("❌ Ошибка при проверке авторизации:", error)
			setIsAuthenticated(false)
			setIsAdmin(false)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					flexDirection: "column",
					gap: "20px",
				}}>
				<h2>Загрузка...</h2>
				<p>Проверка прав доступа...</p>
			</div>
		)
	}

	return (
		<div className='page-content'>
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
					path='/order'
					element={<Orders />}
				/>
				<Route
					path='/order/:id'
					element={<OrderTracking />}
				/>
				<Route
					path='/product/:id'
					element={<ProductDetail />}
				/>
				<Route
					path='/about'
					element={<AboutUs />}
				/>
				<Route
					path='/contact-us'
					element={<ContactUs />}
				/>

				<Route
					path='/admin'
					element={
						<ProtectedRoute
							isAuthenticated={isAuthenticated}
							isAdmin={isAdmin}
							loading={loading}>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
