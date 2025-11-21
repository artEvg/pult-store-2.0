export const formatCurrency = amount => {
	return new Intl.NumberFormat("ru-RU", {
		style: "currency",
		currency: "RUB",
	}).format(amount)
}

export const formatDate = date => {
	return new Date(date).toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}

export const getStatusColor = status => {
	const statusColors = {
		Processing: "#ffebc8",
		Shipped: "#c6f6d5",
		Доставлено: "#bee3f8",
		Cancelled: "#fed7d7",
	}
	return statusColors[status] || "#e2e8f0"
}

export const getStatusTextColor = status => {
	const statusColors = {
		Processing: "#7c2d12",
		Shipped: "#22543d",
		Доставлено: "#2c5282",
		Cancelled: "#742a2a",
	}
	return statusColors[status] || "#2d3748"
}

export const validateProductForm = formData => {
	const errors = {}

	if (!formData.name?.trim()) {
		errors.name = "Название товара обязательно"
	}

	if (!formData.description?.trim()) {
		errors.description = "Описание товара обязательно"
	}

	if (!formData.price || formData.price <= 0) {
		errors.price = "Цена должна быть больше 0"
	}

	if (!formData.stock || formData.stock < 0) {
		errors.stock = "Количество не может быть отрицательным"
	}

	if (!formData.category) {
		errors.category = "Выберите категорию"
	}

	if (formData.images.length === 0 || !formData.images[0].url) {
		errors.images = "Добавьте хотя бы одно изображение"
	}

	return errors
}

export const getOrderStats = orders => {
	const stats = {
		total: orders.length,
		processing: orders.filter(o => o.orderStatus === "Processing").length,
		shipped: orders.filter(o => o.orderStatus === "Shipped").length,
		delivered: orders.filter(o => o.orderStatus === "Доставлено").length,
		cancelled: orders.filter(o => o.orderStatus === "Cancelled").length,
		totalRevenue: orders.reduce(
			(sum, order) => sum + (order.totalPrice || 0),
			0
		),
	}
	return stats
}

export const getProductStats = products => {
	const stats = {
		total: products.length,
		lowStock: products.filter(p => p.stock < 10).length,
		outOfStock: products.filter(p => p.stock === 0).length,
		totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
	}
	return stats
}

export const exportToCSV = (data, filename = "export.csv") => {
	if (!data || data.length === 0) {
		alert("Нет данных для экспорта")
		return
	}

	const headers = Object.keys(data[0])
	let csv = headers.join(",") + "\n"

	data.forEach(row => {
		const values = headers.map(header => {
			const value = row[header]
			if (typeof value === "string" && value.includes(",")) {
				return `"${value}"`
			}
			return value
		})
		csv += values.join(",") + "\n"
	})

	const blob = new Blob([csv], { type: "text/csv" })
	const url = URL.createObjectURL(blob)
	const link = document.createElement("a")
	link.href = url
	link.download = filename
	link.click()
	URL.revokeObjectURL(url)
}

export const searchInArray = (array, query, fields) => {
	if (!query.trim()) return array

	const lowerQuery = query.toLowerCase()
	return array.filter(item =>
		fields.some(field => {
			const value = item[field]
			return value && value.toString().toLowerCase().includes(lowerQuery)
		})
	)
}

export const sortArray = (array, sortBy, order = "asc") => {
	const sorted = [...array].sort((a, b) => {
		const aValue = a[sortBy]
		const bValue = b[sortBy]

		if (typeof aValue === "string") {
			return order === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue)
		}

		return order === "asc" ? aValue - bValue : bValue - aValue
	})

	return sorted
}
