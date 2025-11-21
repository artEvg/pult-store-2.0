import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: [true, "Product is required"],
	},
	name: { type: String, required: true },
	image: { type: String, required: [true, "Image is required"] },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
})

const orderSchema = new mongoose.Schema({
	shippingInfo: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: String,
		country: { type: String, required: true },
		pinCode: Number,
		phoneNo: { type: String, required: true },
	},
	orderItems: [orderItemSchema],
	itemsPrice: { type: Number, required: true },
	taxPrice: { type: Number, required: true },
	shippingPrice: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	paidAt: Date,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	orderStatus: { type: String, default: "Обработка" },
	deliveredAt: Date,
	createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model("Order", orderSchema)
export default Order
