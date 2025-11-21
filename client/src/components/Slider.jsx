import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Slider.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ProductSlider = ({ products, token }) => {
	const navigate = useNavigate()

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		centerPadding: "20px",
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 3, slidesToScroll: 3 },
			},
			{
				breakpoint: 768,
				settings: { slidesToShow: 2, slidesToScroll: 2 },
			},
			{
				breakpoint: 480,
				settings: { slidesToShow: 1, slidesToScroll: 1 },
			},
		],
	}

	const handleAddToCart = async productId => {
		if (!token) {
			alert("Пожалуйста, войдите в аккаунт")
			return
		}

		try {
			await axios.post(
				"http://localhost:4000/api/cart/add",
				{ productId, quantity: 1 },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			alert("Товар добавлен в корзину")
		} catch (error) {
			console.error("Ошибка при добавлении в корзину:", error)
			alert("Ошибка при добавлении в корзину")
		}
	}

	return (
		<Slider {...settings}>
			{products.map(product => (
				<div
					className='slider'
					key={product._id}
					style={{ padding: "0 10px" }}
					onClick={() => navigate(`/product/${product._id}`)}>
					<div
						className='product-card'
						style={{ cursor: "pointer" }}>
						<div className='product-image'>
							{product.images && product.images.length > 0 ? (
								<img
									src={product.images[0].url}
									alt={product.name}
								/>
							) : (
								<p>Нет изображения</p>
							)}
						</div>
						<div className='product-info'>
							<h3>{product.name}</h3>
							<p className='description'>{product.description}</p>
							<div className='product-footer'>
								<span className='price'>{product.price} ₽</span>
								<span className='stock'>В наличие: {product.stock}</span>
							</div>
							<button
								onClick={e => {
									e.stopPropagation()
									handleAddToCart(product._id)
								}}
								className='add-to-cart-btn'
								disabled={product.stock === 0}>
								{product.stock > 0 ? "В корзину" : "Нет в наличии"}
							</button>
						</div>
					</div>
				</div>
			))}
		</Slider>
	)
}

export default ProductSlider
