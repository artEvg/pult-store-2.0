import React, { useState, useEffect } from "react"
import "./AdminDashboard.css"
import {
	FiEdit2,
	FiTrash2,
	FiPlus,
	FiX,
	FiMenu,
	FiLogOut,
} from "react-icons/fi"
import {
	MdDashboard,
	MdShoppingCart,
	MdInventory2,
	MdAssignmentReturn,
} from "react-icons/md"

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState("dashboard")
	const [products, setProducts] = useState([])
	const [orders, setOrders] = useState([])
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [showProductModal, setShowProductModal] = useState(false)
	const [editingProduct, setEditingProduct] = useState(null)
	const [loading, setLoading] = useState(false)
	const [totalAmount, setTotalAmount] = useState(0)
	const [stats, setStats] = useState({
		totalOrders: 0,
		totalProducts: 0,
		totalRevenue: 0,
		pendingOrders: 0,
	})

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		images: [{ url: "", public_id: "" }],
	})

	const API_URL = "http://localhost:4000/api"

	// Получить все товары
	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/products`)
			const data = await response.json()
			if (data.success) {
				setProducts(data.products)
			}
		} catch (error) {
			console.error("Ошибка при загрузке товаров:", error)
		} finally {
			setLoading(false)
		}
	}

	// Получить все заказы
	const fetchOrders = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/order/admin/orders`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
			})
			const data = await response.json()
			if (data.success) {
				setOrders(data.orders)
				setTotalAmount(data.totalAmount)
				updateStats(data.orders, products)
			}
		} catch (error) {
			console.error("Ошибка при загрузке заказов:", error)
		} finally {
			setLoading(false)
		}
	}

	// Обновить статистику
	const updateStats = (ordersList, productsList) => {
		const stats = {
			totalOrders: ordersList.length,
			totalProducts: productsList.length,
			totalRevenue: ordersList.reduce(
				(sum, order) => sum + (order.totalPrice || 0),
				0
			),
			pendingOrders: ordersList.filter(
				order => order.orderStatus === "Processing"
			).length,
		}
		setStats(stats)
	}

	useEffect(() => {
		fetchProducts()
		fetchOrders()
	}, [])

	useEffect(() => {
		if (products.length > 0) {
			updateStats(orders, products)
		}
	}, [products, orders])

	// Обработка изменения формы
	const handleFormChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	// Обработка изменения изображений
	const handleImageChange = (index, field, value) => {
		const newImages = [...formData.images]
		newImages[index] = { ...newImages[index], [field]: value }
		setFormData(prev => ({
			...prev,
			images: newImages,
		}))
	}

	// Добавить изображение
	const addImage = () => {
		setFormData(prev => ({
			...prev,
			images: [...prev.images, { url: "", public_id: "" }],
		}))
	}

	// Удалить изображение
	const removeImage = index => {
		setFormData(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}))
	}

	// Создать товар
	const handleCreateProduct = async e => {
		e.preventDefault()
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/admin/product/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			if (data.success) {
				alert("Товар успешно создан")
				setShowProductModal(false)
				resetForm()
				fetchProducts()
			} else {
				alert("Ошибка: " + data.message)
			}
		} catch (error) {
			console.error("Ошибка при создании товара:", error)
			alert("Ошибка при создании товара")
		} finally {
			setLoading(false)
		}
	}

	// Обновить товар
	const handleUpdateProduct = async e => {
		e.preventDefault()
		try {
			setLoading(true)
			const response = await fetch(
				`${API_URL}/admin/product/${editingProduct._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					credentials: "include",
					body: JSON.stringify(formData),
				}
			)
			const data = await response.json()
			if (data.success) {
				alert("Товар успешно обновлен")
				setShowProductModal(false)
				resetForm()
				fetchProducts()
			} else {
				alert("Ошибка: " + data.message)
			}
		} catch (error) {
			console.error("Ошибка при обновлении товара:", error)
			alert("Ошибка при обновлении товара")
		} finally {
			setLoading(false)
		}
	}

	// Удалить товар
	const handleDeleteProduct = async productId => {
		if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
			try {
				setLoading(true)
				const response = await fetch(`${API_URL}/admin/product/${productId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					credentials: "include",
				})
				const data = await response.json()
				if (data.success) {
					alert("Товар успешно удален")
					fetchProducts()
				} else {
					alert("Ошибка: " + data.message)
				}
			} catch (error) {
				console.error("Ошибка при удалении товара:", error)
				alert("Ошибка при удалении товара")
			} finally {
				setLoading(false)
			}
		}
	}

	// Открыть модальное окно редактирования
	const handleEditProduct = product => {
		setEditingProduct(product)
		setFormData({
			name: product.name,
			description: product.description,
			price: product.price,
			stock: product.stock,
			images: product.images || [{ url: "", public_id: "" }],
		})
		setShowProductModal(true)
	}

	// Открыть модальное окно создания
	const handleNewProduct = () => {
		setEditingProduct(null)
		resetForm()
		setShowProductModal(true)
	}

	// Сбросить форму
	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			price: "",
			stock: "",
			images: [{ url: "", public_id: "" }],
		})
	}

	// Обновить статус заказа
	const handleUpdateOrderStatus = async (orderId, newStatus) => {
		try {
			setLoading(true)
			const response = await fetch(`${API_URL}/order/admin/order/${orderId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
				body: JSON.stringify({ status: newStatus }),
			})
			const data = await response.json()
			if (data.success) {
				alert("Статус заказа обновлен")
				fetchOrders()
			} else {
				alert("Ошибка: " + data.message)
			}
		} catch (error) {
			console.error("Ошибка при обновлении статуса:", error)
			alert("Ошибка при обновлении статуса")
		} finally {
			setLoading(false)
		}
	}

	// Удалить заказ
	const handleDeleteOrder = async orderId => {
		if (window.confirm("Вы уверены, что хотите удалить этот заказ?")) {
			try {
				setLoading(true)
				const response = await fetch(
					`${API_URL}/order/admin/order/${orderId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						credentials: "include",
					}
				)
				const data = await response.json()
				if (data.success) {
					alert("Заказ успешно удален")
					fetchOrders()
				} else {
					alert("Ошибка: " + data.message)
				}
			} catch (error) {
				console.error("Ошибка при удалении заказа:", error)
				alert("Ошибка при удалении заказа")
			} finally {
				setLoading(false)
			}
		}
	}

	// Выход
	const handleLogout = () => {
		localStorage.removeItem("token")
		window.location.href = "/login"
	}

	return (
		<div className='admin-dashboard'>
			{/* Боковая панель */}
			<aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
				<div className='sidebar-header'>
					<h2>Admin Panel</h2>
					<button
						className='sidebar-toggle'
						onClick={() => setSidebarOpen(!sidebarOpen)}>
						<FiMenu />
					</button>
				</div>

				<nav className='sidebar-nav'>
					<button
						className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
						onClick={() => setActiveTab("dashboard")}>
						<MdDashboard />
						<span>Dashboard</span>
					</button>
					<button
						className={`nav-item ${activeTab === "products" ? "active" : ""}`}
						onClick={() => setActiveTab("products")}>
						<MdInventory2 />
						<span>Товары</span>
					</button>
					<button
						className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
						onClick={() => setActiveTab("orders")}>
						<MdShoppingCart />
						<span>Заказы</span>
					</button>
				</nav>

				<button
					className='logout-btn'
					onClick={handleLogout}>
					<FiLogOut />
					<span>Выход</span>
				</button>
			</aside>

			{/* Основной контент */}
			<main className='main-content'>
				{/* Dashboard */}
				{activeTab === "dashboard" && (
					<section className='section'>
						<h1>Dashboard</h1>
						<div className='stats-grid'>
							<div className='stat-card'>
								<div className='stat-icon'>📊</div>
								<div className='stat-info'>
									<h3>Всего заказов</h3>
									<p className='stat-value'>{stats.totalOrders}</p>
								</div>
							</div>
							<div className='stat-card'>
								<div className='stat-icon'>📦</div>
								<div className='stat-info'>
									<h3>Всего товаров</h3>
									<p className='stat-value'>{stats.totalProducts}</p>
								</div>
							</div>
							<div className='stat-card'>
								<div className='stat-icon'>💰</div>
								<div className='stat-info'>
									<h3>Общий доход</h3>
									<p className='stat-value'>
										₽{stats.totalRevenue.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					</section>
				)}

				{/* Товары */}
				{activeTab === "products" && (
					<section className='section'>
						<div className='section-header'>
							<h1>Управление товарами</h1>
							<button
								className='btn btn-primary'
								onClick={handleNewProduct}>
								<FiPlus /> Добавить товар
							</button>
						</div>

						{loading ? (
							<div className='loading'>Загрузка...</div>
						) : (
							<div className='products-table-wrapper'>
								<table className='products-table'>
									<thead>
										<tr>
											<th>№</th>
											<th>Название</th>
											<th>Цена</th>
											<th>Количество</th>
											<th>Статус</th>
											<th>Действия</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product, index) => (
											<tr key={product._id}>
												<td>{index + 1}</td>
												<td>
													<div className='product-cell'>
														{product.images && product.images.length > 0 && (
															<img
																src={product.images[0].url}
																alt={product.name}
															/>
														)}
														<span>{product.name}</span>
													</div>
												</td>
												<td>₽{product.price}</td>
												<td>{product.category}</td>
												<td>
													<span
														className={`stock ${
															product.stock > 10 ? "in-stock" : "low-stock"
														}`}>
														{product.stock}
													</span>
												</td>
												<td>
													<span className='status-badge status-active'>
														Активен
													</span>
												</td>
												<td>
													<div className='action-buttons'>
														<button
															className='btn btn-sm btn-edit'
															onClick={() => handleEditProduct(product)}
															title='Редактировать'>
															<FiEdit2 />
														</button>
														<button
															className='btn btn-sm btn-delete'
															onClick={() => handleDeleteProduct(product._id)}
															title='Удалить'>
															<FiTrash2 />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</section>
				)}

				{/* Заказы */}
				{activeTab === "orders" && (
					<section className='section'>
						<div className='section-header'>
							<h1>Управление заказами</h1>
							<div className='total-revenue'>
								<span>Общий доход:</span>
								<strong>₽{totalAmount.toLocaleString()}</strong>
							</div>
						</div>

						{loading ? (
							<div className='loading'>Загрузка...</div>
						) : (
							<div className='orders-table-wrapper'>
								<table className='orders-table'>
									<thead>
										<tr>
											<th>ID Заказа</th>
											<th>Клиент</th>
											<th>Сумма</th>
											<th>Статус</th>
											<th>Дата</th>
											<th>Действие</th>
										</tr>
									</thead>
									<tbody>
										{orders.map(order => (
											<tr key={order._id}>
												<td>
													<strong>{order._id.slice(-6)}</strong>
												</td>
												<td>
													<div className='customer-info'>
														<p>{order.shippingInfo?.address}</p>
														<small>{order.shippingInfo?.city}</small>
													</div>
												</td>
												<td className='price'>₽{order.totalPrice}</td>
												<td>
													<select
														className='status-select'
														value={order.orderStatus}
														onChange={e =>
															handleUpdateOrderStatus(order._id, e.target.value)
														}>
														<option value='В обработке'>Обработка</option>
														<option value='Отправлено'>Отправлено</option>
														<option value='Доставлено'>Доставлено</option>
														<option value='Отменено'>Отменено</option>
													</select>
												</td>
												<td>
													{new Date(order.createdAt).toLocaleDateString(
														"ru-RU"
													)}
												</td>
												<td>
													<div className='action-buttons items-start'>
														<button
															className='btn btn-sm btn-delete'
															onClick={() => handleDeleteOrder(order._id)}
															title='Удалить'>
															<FiTrash2 />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</section>
				)}

				{/* Возвраты */}
				{activeTab === "returns" && (
					<section className='section'>
						<h1>Управление возвратами</h1>
						<div className='empty-state'>
							<p>Нет активных возвратов</p>
						</div>
					</section>
				)}
			</main>

			{/* Модальное окно для товара */}
			{showProductModal && (
				<div className='modal-overlay'>
					<div className='modal'>
						<div className='modal-header'>
							<h2>
								{editingProduct
									? "Редактировать товар"
									: "Добавить новый товар"}
							</h2>
							<button
								className='close-btn'
								onClick={() => setShowProductModal(false)}>
								<FiX />
							</button>
						</div>

						<form
							onSubmit={
								editingProduct ? handleUpdateProduct : handleCreateProduct
							}>
							<div className='form-group'>
								<label>Название товара</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleFormChange}
									required
								/>
							</div>

							<div className='form-group'>
								<label>Описание</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleFormChange}
									rows='4'
									required
								/>
							</div>

							<div className='form-row'>
								<div className='form-group'>
									<label>Цена (₽)</label>
									<input
										type='number'
										name='price'
										value={formData.price}
										onChange={handleFormChange}
										required
									/>
								</div>
								<div className='form-group'>
									<label>Количество</label>
									<input
										type='number'
										name='stock'
										value={formData.stock}
										onChange={handleFormChange}
										required
									/>
								</div>
							</div>

							<div className='form-group'>
								<label>Изображения</label>
								{formData.images.map((image, index) => (
									<div
										key={index}
										className='image-input-group'>
										<input
											type='url'
											placeholder='URL изображения'
											value={image.url}
											onChange={e =>
												handleImageChange(index, "url", e.target.value)
											}
										/>
										<input
											type='text'
											placeholder='Public ID'
											value={image.public_id}
											onChange={e =>
												handleImageChange(index, "public_id", e.target.value)
											}
										/>
										{formData.images.length > 1 && (
											<button
												type='button'
												className='btn btn-sm btn-delete'
												onClick={() => removeImage(index)}>
												<FiTrash2 />
											</button>
										)}
									</div>
								))}
								<button
									type='button'
									className='btn btn-sm btn-secondary'
									onClick={addImage}>
									<FiPlus /> Добавить изображение
								</button>
							</div>

							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									onClick={() => setShowProductModal(false)}>
									Отмена
								</button>
								<button
									type='submit'
									className='btn btn-primary'
									disabled={loading}>
									{loading
										? "Загрузка..."
										: editingProduct
										? "Обновить"
										: "Создать"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminDashboard
