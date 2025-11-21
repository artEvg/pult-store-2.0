import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Slider from "react-slick"
import Navbar from "../components/Navbar"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./ProductDetail.css"

const ProductDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true)
				const res = await axios.get(`http://localhost:4000/api/product/${id}`)
				if (res.data) setProduct(res.data.product)
			} catch (err) {
				setError("Ошибка при загрузке товара")
			} finally {
				setLoading(false)
			}
		}
		fetchProduct()
	}, [id])

	const handleAddToCart = async productId => {
		if (!token) {
			alert("Пожалуйста, войдите в аккаунт")
			return
		}
		try {
			await axios.post(
				"http://localhost:4000/api/cart/add",
				{ productId, quantity: 1 },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			alert("Товар добавлен в корзину")
		} catch (error) {
			console.error("Ошибка при добавлении в корзину:", error)
			alert("Ошибка при добавлении в корзину")
		}
	}

	if (loading)
		return (
			<div className='home-container'>
				<p>Загрузка...</p>
			</div>
		)
	if (error) return <p>{error}</p>
	if (!product) return <p>Товар не найден</p>

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true,
	}

	return (
		<>
			<Navbar />
			<div className='product-detail-wrapper'>
				<button
					className='close-btn'
					onClick={() => navigate(-1)}>
					&#x2715;
				</button>

				<div className='product-detail-container'>
					<h1>{product.name}</h1>

					<Slider
						{...sliderSettings}
						style={{ marginBottom: 20 }}>
						{product.images && product.images.length > 0 ? (
							product.images.map((img, index) => (
								<div key={index}>
									<img
										src={img.url}
										alt={`${product.name} - фото ${index + 1}`}
										className='product-image'
										style={{
											width: "100%",
											maxHeight: 400,
											objectFit: "contain",
											borderRadius: 8,
											background: "#f9f9f9",
											boxShadow: "inset 0 0 8px rgba(0,0,0,0.03)",
										}}
									/>
								</div>
							))
						) : (
							<p>Нет изображений</p>
						)}
					</Slider>

					<p className='description'>{product.description}</p>
					<p className='price'>
						<b>Цена: </b>
						{product.price} ₽
					</p>
					<p className='stock'>
						<b>Остаток: </b>
						{product.stock}
					</p>
					<button
						className='add-to-cart-btn'
						onClick={() => handleAddToCart(product._id)}
						disabled={product.stock === 0}>
						{product.stock > 0 ? "Добавить в корзину" : "Нет в наличии"}
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductDetail
