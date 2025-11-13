import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const AppContext = createContext()

export const AppContextProvider = props => {
	axios.defaults.withCredentials = true
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const [isLoggedin, setIsLoggedin] = useState(false)
	const [userData, setUserData] = useState(false)

	// Новое состояние для корзины и количества товаров
	const [cart, setCart] = useState(null)
	const [cartItemCount, setCartItemCount] = useState(0)

	const getAuthState = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/auth/is-auth")
			if (data.success) {
				setIsLoggedin(true)
				getUserData()
				fetchCart()
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	// Загружает корзину и обновляет счетчик
	const fetchCart = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/cart", {
				withCredentials: true,
			})
			if (data) {
				setCart(data)
				setCartItemCount(data.totalQuantity || 0)
			}
		} catch (error) {
			toast.error("Ошибка загрузки корзины: " + error.message)
		}
	}

	useEffect(() => {
		getAuthState()
	}, [])

	const getUserData = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/user/data")
			data.success ? setUserData(data.userData) : toast.error(data.message)
		} catch (error) {
			toast.error(error.message)
		}
	}

	const value = {
		backendUrl,
		isLoggedin,
		setIsLoggedin,
		userData,
		setUserData,
		getUserData,
		cart,
		setCart,
		cartItemCount,
		setCartItemCount,
		fetchCart,
	}

	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	)
}
