import Product from "../models/Product.js"
import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../utils/errorHandler.js"

// Получить все товары
export const getAllProducts = async (req, res, next) => {
	const { keyword, price } = req.query

	let query = {}

	if (keyword) {
		query.name = {
			$regex: keyword,
			$options: "i",
		}
	}

	if (price) {
		const priceArray = price.split("-")
		query.price = {
			$gte: priceArray,
			$lte: priceArray,
		}
	}

	const products = await Product.find(query)

	res.status(200).json({
		success: true,
		products,
	})
}

// Получить товар по ID
export const getProductDetails = async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		return next(new ErrorHandler("Товар не найден", 404))
	}

	res.status(200).json({
		success: true,
		product,
	})
}

export const createProduct = async (req, res, next) => {
	try {
		req.body.user = req.user.id
		const product = await Product.create(req.body)
		res.status(201).json({
			success: true,
			product,
		})
	} catch (error) {
		next(error)
	}
}

export const updateProduct = async (req, res, next) => {
	try {
		let product = await Product.findById(req.params.id)
		if (!product) {
			return next(new ErrorHandler("Товар не найден", 404))
		}
		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		})
		res.status(200).json({
			success: true,
			product,
		})
	} catch (error) {
		next(error)
	}
}

export const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id)
		if (!product) {
			return next(new ErrorHandler("Товар не найден", 404))
		}
		await Product.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			message: "Товар успешно удален",
		})
	} catch (error) {
		next(error)
	}
}
