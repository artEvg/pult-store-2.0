import Order from "../models/Order.js"
import Product from "../models/Product.js"
import Cart from "../models/Cart.js"
import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../utils/errorHandler.js"

// Создать новый заказ
export const newOrder = async (req, res, next) => {
	const {
		shippingInfo,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	const order = await Order.create({
		shippingInfo,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paidAt: Date.now(),
		user: req.user.id,
	})

	// Уменьшаем количество товара на складе
	for (let i = 0; i < orderItems.length; i++) {
		const product = await Product.findById(orderItems[i].product)
		product.stock = product.stock - orderItems[i].quantity
		await product.save({ validateBeforeSave: false })
	}

	// Очищаем корзину
	await Cart.findOneAndUpdate(
		{ user: req.user.id },
		{
			cartItems: [],
			totalPrice: 0,
			totalQuantity: 0,
		}
	)

	res.status(201).json({
		success: true,
		order,
	})
}

// Получить заказ по ID
export const getSingleOrder = async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	)

	if (!order) {
		return next(new ErrorHandler("Заказ не найден", 404))
	}

	res.status(200).json({
		success: true,
		order,
	})
}

// Получить все заказы пользователя
export const myOrders = async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id })

	res.status(200).json({
		success: true,
		orders,
	})
}

// Получить все заказы (админ)
export const getAllOrders = async (req, res, next) => {
	const orders = await Order.find()

	let totalAmount = 0

	orders.forEach(order => {
		totalAmount += order.totalPrice
	})

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	})
}

// Обновить статус заказа (админ)
export const updateOrder = async (req, res, next) => {
	const order = await Order.findById(req.params.id)

	if (!order) {
		return next(new ErrorHandler("Заказ не найден", 404))
	}

	if (req.body.status === "Доставлено") {
		order.deliveredAt = Date.now()
	}

	order.orderStatus = req.body.status

	await order.save({ validateBeforeSave: false })

	res.status(200).json({
		success: true,
		order,
	})
}

// Удалить заказ (админ)
export const deleteOrder = async (req, res, next) => {
	const order = await Order.findById(req.params.id)

	if (!order) {
		return next(new ErrorHandler("Заказ не найден", 404))
	}

	await Order.findByIdAndDelete(req.params.id)

	res.status(200).json({
		success: true,
		message: "Заказ удален",
	})
}
