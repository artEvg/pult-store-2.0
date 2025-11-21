import React, { useState } from "react"
import { FiPlus, FiTrash2 } from "react-icons/fi"
import { validateProductForm } from "../utils/AdminHelper"

const ProductForm = ({ initialData = null, onSubmit, loading = false }) => {
	const [formData, setFormData] = useState(
		initialData || {
			name: "",
			description: "",
			price: "",
			stock: "",
			images: [{ url: "", public_id: "" }],
		}
	)

	const [errors, setErrors] = useState({})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: "" }))
		}
	}

	const handleImageChange = (index, field, value) => {
		const newImages = [...formData.images]
		newImages[index] = { ...newImages[index], [field]: value }
		setFormData(prev => ({ ...prev, images: newImages }))
	}

	const addImage = () => {
		setFormData(prev => ({
			...prev,
			images: [...prev.images, { url: "", public_id: "" }],
		}))
	}

	const removeImage = index => {
		if (formData.images.length > 1) {
			setFormData(prev => ({
				...prev,
				images: prev.images.filter((_, i) => i !== index),
			}))
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		const validationErrors = validateProductForm(formData)

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		onSubmit(formData)
	}

	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<div>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
					Название товара
				</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					style={{
						width: "100%",
						padding: "10px 12px",
						border: `2px solid ${errors.name ? "#fc8181" : "#cbd5e0"}`,
						borderRadius: "6px",
					}}
				/>
				{errors.name && (
					<p style={{ color: "#c53030", fontSize: "12px" }}>{errors.name}</p>
				)}
			</div>

			<div>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
					Описание
				</label>
				<textarea
					name='description'
					value={formData.description}
					onChange={handleChange}
					rows='4'
					style={{
						width: "100%",
						padding: "10px 12px",
						border: `2px solid ${errors.description ? "#fc8181" : "#cbd5e0"}`,
						borderRadius: "6px",
						fontFamily: "inherit",
					}}
				/>
				{errors.description && (
					<p style={{ color: "#c53030", fontSize: "12px" }}>
						{errors.description}
					</p>
				)}
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "15px",
				}}>
				<div>
					<label
						style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
						Цена (₽)
					</label>
					<input
						type='number'
						name='price'
						value={formData.price}
						onChange={handleChange}
						style={{
							width: "100%",
							padding: "10px 12px",
							border: `2px solid ${errors.price ? "#fc8181" : "#cbd5e0"}`,
							borderRadius: "6px",
						}}
					/>
					{errors.price && (
						<p style={{ color: "#c53030", fontSize: "12px" }}>{errors.price}</p>
					)}
				</div>

				<div>
					<label
						style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
						Количество
					</label>
					<input
						type='number'
						name='stock'
						value={formData.stock}
						onChange={handleChange}
						style={{
							width: "100%",
							padding: "10px 12px",
							border: `2px solid ${errors.stock ? "#fc8181" : "#cbd5e0"}`,
							borderRadius: "6px",
						}}
					/>
					{errors.stock && (
						<p style={{ color: "#c53030", fontSize: "12px" }}>{errors.stock}</p>
					)}
				</div>
			</div>

			<div>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
					Категория
				</label>
				<select
					name='category'
					value={formData.category}
					onChange={handleChange}
					style={{
						width: "100%",
						padding: "10px 12px",
						border: "1px solid #cbd5e0",
						borderRadius: "6px",
					}}>
					<option value='Электроника'>Электроника</option>
					<option value='Одежда'>Одежда</option>
					<option value='Книги'>Книги</option>
					<option value='Прочее'>Прочее</option>
				</select>
			</div>

			<div>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
					Изображения
				</label>
				{formData.images.map((image, index) => (
					<div
						key={index}
						style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
						<input
							type='url'
							placeholder='URL изображения'
							value={image.url}
							onChange={e => handleImageChange(index, "url", e.target.value)}
							style={{
								flex: 1,
								padding: "10px 12px",
								border: "1px solid #cbd5e0",
								borderRadius: "6px",
							}}
						/>
						<input
							type='text'
							placeholder='Public ID'
							value={image.public_id}
							onChange={e =>
								handleImageChange(index, "public_id", e.target.value)
							}
							style={{
								flex: 1,
								padding: "10px 12px",
								border: "1px solid #cbd5e0",
								borderRadius: "6px",
							}}
						/>
						{formData.images.length > 1 && (
							<button
								type='button'
								onClick={() => removeImage(index)}
								style={{
									padding: "10px",
									background: "#fed7d7",
									border: "none",
									borderRadius: "6px",
									cursor: "pointer",
									color: "#742a2a",
								}}>
								<FiTrash2 />
							</button>
						)}
					</div>
				))}
				<button
					type='button'
					onClick={addImage}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "8px 12px",
						background: "#e2e8f0",
						border: "none",
						borderRadius: "6px",
						cursor: "pointer",
						fontSize: "14px",
						fontWeight: 600,
					}}>
					<FiPlus /> Добавить изображение
				</button>
			</div>

			<button
				type='submit'
				disabled={loading}
				style={{
					padding: "12px",
					background: loading
						? "#cbd5e0"
						: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					color: "white",
					border: "none",
					borderRadius: "6px",
					cursor: loading ? "not-allowed" : "pointer",
					fontSize: "16px",
					fontWeight: 600,
				}}>
				{loading ? "Загрузка..." : "Сохранить"}
			</button>
		</form>
	)
}

export default ProductForm
