import mongoose from "mongoose"

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Пожалуйста, введите название товара"],
		trim: true,
		maxLength: [100, "Название товара не может быть более 100 символов"],
	},
	description: {
		type: String,
		required: [true, "Пожалуйста, введите описание товара"],
	},
	price: {
		type: Number,
		required: [true, "Пожалуйста, введите цену товара"],
		maxLength: [8, "Цена не может быть более 99999999"],
		default: 0,
	},
	rating: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Пожалуйста, введите категорию товара"],
		enum: {
			values: ["Электроника", "Одежда", "Книги", "Прочее"],
			message: "Пожалуйста, выберите корректную категорию товара",
		},
	},
	stock: {
		type: Number,
		required: [true, "Пожалуйста, введите количество товара"],
		maxLength: [4, "Количество товара не может быть более 9999"],
		default: 1,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: String,
			rating: Number,
			comment: String,
			avatar: String,
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
