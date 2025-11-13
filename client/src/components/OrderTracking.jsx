import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import "./OrderTracking.css"

const OrderTracking = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [order, setOrder] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`http://localhost:4000/api/order/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				setOrder(response.data.order)
				setError(null)
			} catch (err) {
				setError("Ошибка при загрузке заказа")
				setOrder(null)
			} finally {
				setLoading(false)
			}
		}
		if (token) {
			fetchOrder()
		} else {
			navigate("/login")
		}
	}, [id, navigate, token])

	if (loading) return <p>Загрузка заказа...</p>
	if (error) return <p>{error}</p>
	if (!order) return <p>Заказ не найден</p>

	return (
		<>
			<Navbar />
			<div className='order-container'>
				<h1>Отслеживание заказа #{order._id}</h1>
				<p className='order-status'>Статус: {order.orderStatus}</p>
				<p className='order-date'>
					Дата создания: {new Date(order.createdAt).toLocaleString()}
				</p>
				<h2>Товары в заказе:</h2>
				<ul className='order-items'>
					{order.orderItems.map(item => (
						<li key={item.product}>
							{item.name} - {item.quantity} шт. по {item.price} ₽
						</li>
					))}
				</ul>
				<div className='order-summary'>
					Итоговая сумма: {order.totalPrice} ₽
				</div>
				<div className='shipping-info'>
					Адрес доставки: {order.shippingInfo.address},{" "}
					{order.shippingInfo.city}, {order.shippingInfo.country}
					<br />
					Телефон: {order.shippingInfo.phoneNo}
				</div>

				{/* Кнопка перехода на главную */}
				<button
					className='back-home-btn'
					onClick={() => navigate("/")}
					style={{
						marginTop: "30px",
						padding: "10px 20px",
						fontSize: "1rem",
						cursor: "pointer",
						backgroundColor: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: "6px",
						display: "block",
						width: "max-content",
					}}>
					На главную
				</button>
			</div>
		</>
	)
}

export default OrderTracking
