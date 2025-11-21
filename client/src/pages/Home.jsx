import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import Slider from "../components/Slider"
import "./Home.css"

const Home = () => {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [keyword, setKeyword] = useState("")
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(1000000)
	const token = localStorage.getItem("token")
	const navigate = useNavigate()

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await axios.get("http://localhost:4000/api/products")
			const productsData = response.data.products || []
			setProducts(productsData)
			setFilteredProducts(productsData)
		} catch (error) {
			console.error("Ошибка при загрузке товаров:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		let filtered = Array.isArray(products) ? products : []

		if (keyword) {
			filtered = filtered.filter(product =>
				product.name.toLowerCase().includes(keyword.toLowerCase())
			)
		}

		filtered = filtered.filter(
			product => product.price >= minPrice && product.price <= maxPrice
		)

		setFilteredProducts(filtered)
	}, [keyword, minPrice, maxPrice, products])

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

	if (loading) {
		return (
			<div className='home-container'>
				<p>Загрузка...</p>
			</div>
		)
	}

	return (
		<>
			<Navbar />

			<div className='home-container'>
				<header className='header'>
					<h1>Качество и надежность каждой покупки</h1>
					<p
						style={{
							maxWidth: 600,
							margin: "0 auto",
							color: "#555",
							fontSize: 18,
						}}>
						Лучшие товары по лучшим ценам. Удобный поиск, фильтры и быстрый
						доступ к популярным и новым продуктам.
					</p>
					<img
						src='https://thumb.cloud.mail.ru/weblink/thumb/xw1/y2nN/w8Z9qe1iW?mt=1763556603000'
						alt='Магазин'
						className='imageMain'
					/>
				</header>

				<section
					aria-label='Слайдер популярных товаров'
					style={{ marginBottom: 50 }}>
					<h2 className='popular-title'>Популярные товары</h2>
					<Slider
						products={products.slice(45, 52)}
						token={token}
					/>
				</section>

				<section aria-label='Фильтры и поиск товаров'>
					<div className='filters'>
						<div className='filter-section'>
							<h3>Поиск по названию</h3>
							<input
								type='text'
								placeholder='Введите название товара...'
								value={keyword}
								onChange={e => setKeyword(e.target.value)}
								className='search-input'
								aria-label='Поиск по названию товара'
							/>
						</div>

						<div className='filter-section'>
							<div className='price-filter'>
								<div>
									<label htmlFor='min-price'>От:</label>
									<input
										id='min-price'
										type='number'
										value={minPrice}
										onChange={e => setMinPrice(parseInt(e.target.value))}
										className='price-input'
										min='0'
									/>
								</div>
								<div>
									<label htmlFor='max-price'>До:</label>
									<input
										id='max-price'
										type='number'
										value={maxPrice}
										onChange={e => setMaxPrice(parseInt(e.target.value))}
										className='price-input'
										min='0'
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section aria-label='Список товаров'>
					<div className='products-grid'>
						{filteredProducts && filteredProducts.length > 0 ? (
							filteredProducts.map(product => (
								<div
									key={product._id}
									className='product-card'
									onClick={() => navigate(`/product/${product._id}`)}
									style={{ cursor: "pointer" }}
									role='button'
									tabIndex={0}
									onKeyDown={e => {
										if (e.key === "Enter") navigate(`/product/${product._id}`)
									}}>
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
										<h3 className='name'>{product.name}</h3>
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
											disabled={product.stock === 0}
											aria-disabled={product.stock === 0}
											aria-label={
												product.stock > 0
													? "Добавить в корзину"
													: "Нет в наличии"
											}>
											{product.stock > 0 ? "В корзину" : "Нет в наличии"}
										</button>
									</div>
								</div>
							))
						) : (
							<p className='no-products'>Товары не найдены</p>
						)}
					</div>
				</section>
			</div>
		</>
	)
}

export default Home
