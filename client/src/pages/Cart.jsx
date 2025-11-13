import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
	const [cart, setCart] = useState(null)
	const [cartItemCount, setCartItemCount] = useState(0)
	const [loading, setLoading] = useState(true)
	const token = localStorage.getItem("token")
	const navigate = useNavigate()

	useEffect(() => {
		if (!token) {
			navigate("/login")
			return
		}
		fetchCart()
	}, [])

	const fetchCart = async () => {
		try {
			setLoading(true)
			const response = await axios.get("http://localhost:4000/api/cart", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setCart(response.data)
		} catch (error) {
			console.error("Ошибка при загрузке корзины:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		// после загрузки корзины
		if (cart) {
			setCartItemCount(cart.totalQuantity)
		}
	}, [cart])

	const handleUpdateQuantity = async (productId, quantity) => {
		if (quantity < 1) return

		try {
			const response = await axios.post(
				"http://localhost:4000/api/cart/update",
				{ productId, quantity },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data && response.data.cart) {
				setCart(response.data.cart)
			} else {
				setCart(response.data)
			}
		} catch (error) {
			console.error("Ошибка при обновлении количества:", error)
			alert("Ошибка при обновлении количества")
		}
	}

	const handleRemoveItem = async productId => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/cart/remove",
				{ productId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setCart(response.data.cart)
		} catch (error) {
			console.error("Ошибка при удалении товара:", error)
			alert("Ошибка при удалении товара")
		}
	}

	const handleCheckout = () => {
		navigate("/checkout")
	}

	if (loading) {
		return (
			<div className='cart-container'>
				<p>Загрузка...</p>
			</div>
		)
	}

	if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
		return (
			<div className='cart-container'>
				<h1>Корзина</h1>
				<div className='empty-cart'>
					<p>Ваша корзина пуста</p>
					<button
						onClick={() => navigate("/")}
						className='continue-shopping'>
						Продолжить покупки
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='cart-container'>
			<h1>Корзина</h1>
			<div className='cart-content'>
				<div className='cart-items'>
					{cart.cartItems.map(item => {
						// Определяем productId в зависимости от структуры: объект или строка
						const productId = item.product?._id || item.product

						return (
							<div
								key={item._id}
								className='cart-item'>
								<div className='item-image'>
									{item.image ? (
										<img
											src={item.image}
											alt={item.name}
										/>
									) : (
										<div className='no-image'>Нет изображения</div>
									)}
								</div>

								<div className='item-details'>
									<h3>{item.name}</h3>
									<p className='item-price'>{item.price} ₽</p>
								</div>

								<div className='item-quantity'>
									<label>Количество:</label>
									<div className='quantity-controls'>
										<button
											onClick={() =>
												handleUpdateQuantity(productId, item.quantity - 1)
											}
											className='qty-btn'>
											-
										</button>
										<input
											type='number'
											value={item.quantity}
											onChange={e =>
												handleUpdateQuantity(
													productId,
													parseInt(e.target.value) || item.quantity
												)
											}
											className='qty-input'
										/>
										<button
											onClick={() =>
												handleUpdateQuantity(productId, item.quantity + 1)
											}
											className='qty-btn'>
											+
										</button>
									</div>
								</div>

								<div className='item-total'>
									<p>{item.price * item.quantity} ₽</p>
								</div>

								<button
									onClick={() => handleRemoveItem(productId)}
									className='remove-btn'>
									Удалить
								</button>
							</div>
						)
					})}
				</div>

				<div className='cart-summary'>
					<h2>Итого</h2>
					<div className='summary-row'>
						<span>Сумма товаров:</span>
						<span>{cart.totalPrice} ₽</span>
					</div>
					<div className='summary-row'>
						<span>Количество товаров:</span>
						<span>{cart.totalQuantity}</span>
					</div>
					<hr />
					<div className='summary-total'>
						<span>Итого к оплате:</span>
						<span className='total-price'>{cart.totalPrice} ₽</span>
					</div>
					<button
						onClick={handleCheckout}
						className='checkout-btn'>
						Оформить заказ
					</button>
					<button
						onClick={() => navigate("/")}
						className='continue-shopping'>
						Продолжить покупки
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart
