import { useState, useCallback } from "react"

export const useAdmin = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	const API_URL = "http://localhost:4000/api"

	const getToken = () => localStorage.getItem("token")

	// Товары
	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/products`)
			const data = await response.json()
			if (data.success) return data.products
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return []
		} finally {
			setLoading(false)
		}
	}, [])

	const createProduct = useCallback(async productData => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/admin/product/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
				body: JSON.stringify(productData),
			})
			const data = await response.json()
			if (data.success) {
				setSuccess("Товар успешно создан")
				return data.product
			}
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	const updateProduct = useCallback(async (productId, productData) => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/admin/product/${productId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
				body: JSON.stringify(productData),
			})
			const data = await response.json()
			if (data.success) {
				setSuccess("Товар успешно обновлен")
				return data.product
			}
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	const deleteProduct = useCallback(async productId => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/admin/product/${productId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
			})
			const data = await response.json()
			if (data.success) {
				setSuccess("Товар успешно удален")
				return true
			}
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return false
		} finally {
			setLoading(false)
		}
	}, [])

	// Заказы
	const fetchOrders = useCallback(async () => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/order/admin/orders`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
			})
			const data = await response.json()
			if (data.success) return data
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return { orders: [], totalAmount: 0 }
		} finally {
			setLoading(false)
		}
	}, [])

	const updateOrderStatus = useCallback(async (orderId, status) => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/order/admin/order/${orderId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
				body: JSON.stringify({ status }),
			})
			const data = await response.json()
			if (data.success) {
				setSuccess("Статус заказа обновлен")
				return data.order
			}
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return null
		} finally {
			setLoading(false)
		}
	}, [])

	const deleteOrder = useCallback(async orderId => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/order/admin/order/${orderId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				credentials: "include",
			})
			const data = await response.json()
			if (data.success) {
				setSuccess("Заказ успешно удален")
				return true
			}
			throw new Error(data.message)
		} catch (err) {
			setError(err.message)
			return false
		} finally {
			setLoading(false)
		}
	}, [])

	const clearMessages = () => {
		setError(null)
		setSuccess(null)
	}

	return {
		loading,
		error,
		success,
		clearMessages,
		// Товары
		fetchProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		// Заказы
		fetchOrders,
		updateOrderStatus,
		deleteOrder,
	}
}

export default useAdmin
