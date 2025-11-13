import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import "./Home.css"

const Home = () => {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [keyword, setKeyword] = useState("")
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(1000000)
	const token = localStorage.getItem("token")

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await axios.get("http://localhost:4000/api/products")
			console.log("Ответ сервера:", response.data)
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
				<h1>Магазин</h1>

				<div className='filters'>
					<div className='filter-section'>
						<h3>Поиск по названию</h3>
						<input
							type='text'
							placeholder='Введите название товара...'
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
							className='search-input'
						/>
					</div>

					<div className='filter-section'>
						<h3>Фильтр по цене</h3>
						<div className='price-filter'>
							<div>
								<label>От:</label>
								<input
									type='number'
									value={minPrice}
									onChange={e => setMinPrice(parseInt(e.target.value))}
									className='price-input'
								/>
							</div>
							<div>
								<label>До:</label>
								<input
									type='number'
									value={maxPrice}
									onChange={e => setMaxPrice(parseInt(e.target.value))}
									className='price-input'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='products-grid'>
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map(product => (
							<div
								key={product._id}
								className='product-card'>
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
										<span className='stock'>Осталось: {product.stock}</span>
									</div>
									<button
										onClick={() => handleAddToCart(product._id)}
										className='add-to-cart-btn'
										disabled={product.stock === 0}>
										{product.stock > 0 ? "В корзину" : "Нет в наличии"}
									</button>
								</div>
							</div>
						))
					) : (
						<p className='no-products'>Товары не найдены</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
