import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

const Checkout = () => {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		address: "",
		city: "",
		state: "",
		country: "",
		pinCode: "",
		phoneNo: "",
	})

	const [orderItems, setOrderItems] = useState([])
	const [totals, setTotals] = useState({
		itemsPrice: 0,
		taxPrice: 0,
		shippingPrice: 0,
		totalPrice: 0,
	})

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
			const response = await axios.get("http://localhost:4000/api/cart", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setOrderItems(
				response.data.cartItems.map(item => ({
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: item.image || "default-image-url.jpg",
					product: item.product?._id || item.product || "",
				}))
			)

			const itemsPrice = response.data.totalPrice
			const taxPrice = Math.round(itemsPrice * 0.1)
			const shippingPrice = itemsPrice > 1000 ? 0 : 150
			const totalPrice = itemsPrice + taxPrice + shippingPrice

			setTotals({ itemsPrice, taxPrice, shippingPrice, totalPrice })
		} catch (error) {
			console.error("Ошибка при загрузке корзины:", error)
			alert("Ошибка при загрузке данных корзины")
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (orderItems.length === 0) {
			alert("Корзина пуста")
			return
		}
		if (
			!formData.address ||
			!formData.city ||
			!formData.country ||
			!formData.phoneNo
		) {
			alert("Пожалуйста, заполните все обязательные поля")
			return
		}

		try {
			setLoading(true)
			const orderData = {
				shippingInfo: {
					address: formData.address,
					city: formData.city,
					state: formData.state,
					country: formData.country,
					pinCode: parseInt(formData.pinCode) || 0,
					phoneNo: formData.phoneNo,
				},
				orderItems,
				itemsPrice: totals.itemsPrice,
				taxPrice: totals.taxPrice,
				shippingPrice: totals.shippingPrice,
				totalPrice: totals.totalPrice,
			}

			const response = await axios.post(
				"http://localhost:4000/api/order/new",
				orderData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			if (response.data.success) {
				alert("Заказ успешно оформлен!")
				navigate(`/order/${response.data.order._id}`)
			}
		} catch (error) {
			console.error("Ошибка при оформлении заказа:", error)
			alert("Ошибка при оформлении заказа")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='checkout-container'>
			<h1>Оформление заказа</h1>
			<div className='checkout-content'>
				<form
					onSubmit={handleSubmit}
					className='checkout-form'>
					<h2>Адрес доставки</h2>

					<div className='form-group'>
						<label>Адрес*</label>
						<input
							type='text'
							name='address'
							value={formData.address}
							onChange={handleChange}
							placeholder='Введите адрес'
							required
						/>
					</div>

					<div className='form-row'>
						<div className='form-group'>
							<label>Город*</label>
							<input
								type='text'
								name='city'
								value={formData.city}
								onChange={handleChange}
								placeholder='Введите город'
								required
							/>
						</div>

						<div className='form-group'>
							<label>Область/Край</label>
							<input
								type='text'
								name='state'
								value={formData.state}
								onChange={handleChange}
								placeholder='Введите область'
							/>
						</div>
					</div>

					<div className='form-row'>
						<div className='form-group'>
							<label>Страна*</label>
							<input
								type='text'
								name='country'
								value={formData.country}
								onChange={handleChange}
								placeholder='Введите страну'
								required
							/>
						</div>

						<div className='form-group'>
							<label>Почтовый индекс</label>
							<input
								type='number'
								name='pinCode'
								value={formData.pinCode}
								onChange={handleChange}
								placeholder='Введите индекс'
							/>
						</div>
					</div>

					<div className='form-group'>
						<label>Номер телефона*</label>
						<input
							type='tel'
							name='phoneNo'
							value={formData.phoneNo}
							onChange={handleChange}
							placeholder='Введите номер телефона'
							required
						/>
					</div>

					<button
						type='submit'
						className='submit-btn'
						disabled={loading}>
						{loading ? "Оформление..." : "Подтвердить заказ"}
					</button>
				</form>

				<div className='order-summary'>
					<h2>Итоговая сумма</h2>
					<div className='order-items-preview'>
						{orderItems.map((item, index) => (
							<div
								key={index}
								className='preview-item'>
								<span>
									{item.name} x{item.quantity}
								</span>
								<span>{item.price * item.quantity} ₽</span>
							</div>
						))}
					</div>

					<hr />

					<div className='summary-section'>
						<div className='summary-row'>
							<span>Сумма товаров:</span>
							<span>{totals.itemsPrice} ₽</span>
						</div>
						<div className='summary-row'>
							<span>Налог (10%):</span>
							<span>{totals.taxPrice} ₽</span>
						</div>
						<div className='summary-row'>
							<span>Доставка:</span>
							<span>
								{totals.shippingPrice === 0
									? "Бесплатно"
									: `${totals.shippingPrice} ₽`}
							</span>
						</div>
					</div>

					<hr />

					<div className='total-price'>
						<span>Итого:</span>
						<span className='price'>{totals.totalPrice} ₽</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Checkout
