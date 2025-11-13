import Cart from "../models/Cart.js"
import Product from "../models/Product.js"
import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../utils/errorHandler.js"

// Получить корзину пользователя
import express from "express"
export const cartRoutes = express.Router()
export const getCart = async (req, res, next) => {
	try {
		let cart = await Cart.findOne({ user: req.user.id })

		if (!cart) {
			return res.status(200).json({
				success: true,
				cartItems: [],
				totalPrice: 0,
				totalQuantity: 0,
			})
		}
		res.status(200).json({
			success: true,
			cartItems: cart.cartItems,
			totalPrice: cart.totalPrice,
			totalQuantity: cart.totalQuantity,
		})
	} catch (error) {
		console.error("Ошибка getCart:", error)
		next(error)
	}
}

// Добавить товар в корзину
export const addToCart = async (req, res, next) => {
	const { productId, quantity } = req.body

	const product = await Product.findById(productId)

	if (!product) {
		return next(new ErrorHandler("Товар не найден", 404))
	}

	if (quantity > product.stock) {
		return next(new ErrorHandler("Недостаточно товара на складе", 400))
	}

	let cart = await Cart.findOne({ user: req.user.id })

	if (!cart) {
		cart = new Cart({
			user: req.user.id,
			cartItems: [],
		})
	}

	// Проверяем, есть ли товар в корзине
	const itemIndex = cart.cartItems.findIndex(
		item => item.product.toString() === productId
	)

	if (itemIndex > -1) {
		// Увеличиваем количество
		cart.cartItems[itemIndex].quantity += quantity
	} else {
		// Добавляем новый товар
		cart.cartItems.push({
			product: productId,
			name: product.name,
			price: product.price,
			image: product.images?.url || "",
			stock: product.stock,
			quantity,
		})
	}

	// Пересчитываем сумму
	cart.totalPrice = cart.cartItems.reduce((acc, item) => {
		return acc + item.price * item.quantity
	}, 0)

	cart.totalQuantity = cart.cartItems.reduce((acc, item) => {
		return acc + item.quantity
	}, 0)

	await cart.save()

	res.status(200).json({
		success: true,
		message: "Товар добавлен в корзину",
		cart,
	})
}

// Удалить товар из корзины
export const removeFromCart = async (req, res, next) => {
	const { productId } = req.body

	let cart = await Cart.findOne({ user: req.user.id })

	if (!cart) {
		return next(new ErrorHandler("Корзина пуста", 404))
	}

	cart.cartItems = cart.cartItems.filter(
		item => item.product.toString() !== productId
	)

	// Пересчитываем сумму
	cart.totalPrice = cart.cartItems.reduce((acc, item) => {
		return acc + item.price * item.quantity
	}, 0)

	cart.totalQuantity = cart.cartItems.reduce((acc, item) => {
		return acc + item.quantity
	}, 0)

	await cart.save()

	res.status(200).json({
		success: true,
		message: "Товар удален из корзины",
		cart,
	})
}

// Обновить количество товара в корзине
export const updateCartItem = async (req, res, next) => {
	const { productId, quantity } = req.body

	const product = await Product.findById(productId)
	if (!product) {
		return next(new ErrorHandler("Товар не найден", 404))
	}

	if (quantity > product.stock) {
		return next(new ErrorHandler("Недостаточно товара на складе", 400))
	}
	console.log("UpdateCartItem productId:", productId)

	let cart = await Cart.findOne({ user: req.user.id }).populate(
		"cartItems.product"
	)
	console.log("User cart:", cart)

	if (!cart) {
		return next(new ErrorHandler("Корзина пуста", 404))
	}

	const itemIndex = cart?.cartItems.findIndex(
		item => item.product._id.toString() === productId
	)
	console.log("Found productIndex:", itemIndex)

	// Если товара нет в корзине, ошибка
	if (itemIndex === -1) {
		return next(new ErrorHandler("Товар не найден в корзине", 404))
	}

	// Обновляем количество
	cart.cartItems[itemIndex].quantity = quantity

	// Если quantity=0, удаляем товар из массива
	if (quantity === 0) {
		cart.cartItems.splice(itemIndex, 1)
	}

	// Пересчитываем сумму и количество товаров
	cart.totalPrice = cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)
	cart.totalQuantity = cart.cartItems.reduce(
		(acc, item) => acc + item.quantity,
		0
	)

	await cart.save()

	res.status(200).json({
		success: true,
		message: "Корзина обновлена",
		cart,
	})
}

// Очистить корзину
export const clearCart = async (req, res, next) => {
	await Cart.findOneAndUpdate(
		{ user: req.user.id },
		{
			cartItems: [],
			totalPrice: 0,
			totalQuantity: 0,
		},
		{ new: true }
	)

	res.status(200).json({
		success: true,
		message: "Корзина очищена",
	})
}
